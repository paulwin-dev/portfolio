const P = [
    {
        n: "Flame Trainer", u: "https://www.roblox.com/games/16772371910/Flame-Trainer-AVATAR-EDITOR-FREE-HELLO-KITTY", r: "Commissioned", m: "media/thumbs/FlameTrainer.png",
        d: "A combat game with <b>8M+</b> visits. I led the scripting until I moved on; the game is still being updated.",
        b: ["Duel system", "Skin picker", "Wig snatching mechanic"]
    },
    {
        n: "Realistic Gun Test", u: "https://www.roblox.com/games/14482243012/Realistic-Gun-test", r: "(Past) Lead programmer", m: "https://www.youtube.com/embed/DDlNVAxtNGE?si=xfFxtHCnjffomaPu",
        d: "A round-based realistic shooter. I scripted everything in the game except the gun system.",
        b: ["Round system and match flow", "All UI, quests and the level system", "A realistic jet system, built as a separate prototype"],
        x: ["Try the jet prototype", "https://www.roblox.com/games/84464085424305/Advanced-Jet-System"]
    },
    {
        n: "Midnight Delivery", r: "Lead programmer", m: "media/thumbs/MidnightDelivery.png",
        d: "A horror game inspired by Scary Shawarma Kiosk and other anomaly games. Set to release end of 2026/early 2027.",
        b: ["Procedural character generation system", "Monster AI", "Production-ready monetization"],
    },
    {
        n: "Rogue West", u: "https://www.youtube.com/watch?v=7A9-KCCrizI", r: "(Past) Lead programmer & designer", m: "https://www.youtube.com/embed/7A9-KCCrizI?si=2jcireVBiAdbrm8J",
        d: "An open world wild west RPG game. A personal project of mine I've been working on for about a year.",
        b: ["Optimized, interactible <b>NPC AI</b>", "Scalable data saving & handling", "Economy & jobs system"],
    },
    {
        n: "Brainrot Survival", r: "(Past) Lead programmer", m: "media/thumbs/BrainrotSurvival.mp4", v: 1,
        d: "A round-based melee combat game where you fight against brainrots. The video shows off the game's combat system.",
        b: ["Exploit-safe combat", "Accurate hitboxes & timing with animations"],
    },
    {
        n: "Voxel World", u: "https://www.roblox.com/games/115615727003858/Voxel-Game", r: "(Past) Lead programmer", m: "https://www.youtube.com/embed/_W7VCM8gDn0?si=ejsTcYN35HjfOkoj",
        d: "A full-fledged minecraft clone in Roblox that includes world saving, procedural terrain generation, biomes, and more.",
        b: ["Optimized terrain generation and rendering", "Complex biomes system based on heat and humidity", "Inventory system", "World saving & loading"],
    },
    {
        n: "Sword RNG", r: "(Past) Lead programmer", m: "media/thumbs/RollMechanic.mp4", v: 1,
        d: "A roll-for-swords game with fights, built until the project was cancelled before launch. The clip shows an early version of the roll.",
        b: ["Exploit-safe server-side rolling", "Global leaderboards", "Inventory, currency and combat"]
    },
    {
        n: "Deep in Debt", u: "https://www.roblox.com/games/15357459254/Deep-In-Debt", r: "(Past) Lead programmer and project manager", m: "media/thumbs/DeepInDebt.webp",
        d: "A retro puzzle/story game inspired by find cheese to feed a rat: pay off your debt within three days. The linked build is an early playable version.",
        b: ["Dialogue system", "Light and door systems", "Story and pacing"]
    }
];
document.getElementById("projects").innerHTML = P.map(p => {
    let media;
    if (p.m.includes("youtube.com/embed/") || p.m.includes("youtu.be/")) {
        // Handle YouTube video embed
        media = `<iframe src="${p.m}" title="${p.n} video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (p.v) {
        // Handle local video files
        media = `<video src="${p.m}" controls muted loop playsinline preload="metadata"></video>`;
    } else {
        // Handle standard images
        media = `<img src="${p.m}" alt="${p.n} screenshot" loading="lazy">`;
    }
    const title = p.u ? `<a href="${p.u}" target="_blank" rel="noopener">${p.n}</a>` : p.n;
    const more = p.x ? `<a class="more" href="${p.x[1]}" target="_blank" rel="noopener">${p.x[0]}</a>` : "";
    return `<article class="proj"><div class="media">${media}</div><div><h3>${title}</h3><p class="role">${p.r}</p><p class="d">${p.d}</p><ul>${p.b.map(i => `<li>${i}</li>`).join("")}</ul>${more}</div></article>`;
}).join("");

/* ---------- Contact form ---------- */
// Create a webhook in Discord (Channel Settings > Integrations > Webhooks > New Webhook) and paste its URL here.
// Anyone who views the page source can see this URL. If it ever gets spammed, delete the webhook and make a new one.
// While this is empty, the form falls back to copying the brief and opening your Discord profile.
const WEBHOOK_URL = "https://discord.com/api/webhooks/1561729151797567549/ijylbfOQsugd33qxQPQd36RaWalWxMLeGGSJ9T4AOoGxGU-jjPbWZGFlQUIBLW3fALwJ";
const COOLDOWN_MS = 60000;

const f = document.getElementById("f"), s = document.getElementById("status");
const clip = (t, n) => String(t).slice(0, n) || "(not given)";

f.addEventListener("submit", async e => {
    e.preventDefault();
    if (f.elements.website.value) return; // hidden spam trap: real visitors never fill it in
    const v = k => f.elements[k].value.trim();
    const user = v("u").replace(/^@/, "");
    const btn = f.querySelector("button");

    if (!WEBHOOK_URL) {
        const t = `Hi Paul, I have a project for you.\nMy Discord: ${user}\nProject: ${v("n") || "(not sure yet)"}\nWhat to build: ${v("d")}\nBudget: ${v("b") || "(not sure yet)"}\nDeadline: ${v("l") || "(not sure yet)"}`;
        window.open("https://discord.com/users/834489773573406770", "_blank", "noopener");
        (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject())
            .then(() => s.textContent = "Brief copied. Paste it into the Discord chat.")
            .catch(() => s.textContent = "Couldn't copy the brief. Open Discord and describe your project there.");
        return;
    }

    let last = 0;
    try { last = Number(localStorage.getItem("last-send")) || 0; } catch { }
    if (Date.now() - last < COOLDOWN_MS) { s.textContent = "Please wait a minute before sending another message."; return; }

    btn.disabled = true;
    s.textContent = "Sending...";
    try {
        const res = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "Portfolio",
                allowed_mentions: { parse: [] }, // visitor text can never ping @everyone
                embeds: [{
                    title: "New project request",
                    color: 0x4086F0,
                    timestamp: new Date().toISOString(),
                    fields: [
                        { name: "Discord", value: clip(user, 100) },
                        { name: "Project", value: clip(v("n"), 200) },
                        { name: "What to build", value: clip(v("d"), 1000) },
                        { name: "Budget", value: clip(v("b"), 100) },
                        { name: "Deadline", value: clip(v("l"), 100) }
                    ]
                }]
            })
        });
        if (!res.ok) throw new Error(res.status);
        try { localStorage.setItem("last-send", String(Date.now())); } catch { }
        s.textContent = `Sent! I'll get back to you soon (@${user}).`;
        f.reset();
    } catch {
        s.textContent = "Couldn't send your message. Please message me on Discord directly instead.";
    }
    btn.disabled = false;
});

/* ---------- Live Roblox stats ---------- */
// Add or remove game links here. Any roblox.com/games/<id>/... link works.
const GAME_LINKS = [
    "https://www.roblox.com/games/14482243012/Realistic-Gun-test",
    "https://www.roblox.com/games/16772371910/Flame-Trainer",
    "https://www.roblox.com/games/15357459254/Deep-In-Debt",
    "https://www.roblox.com/games/133521604713323/Jet-Fighter-Testing"
];
// Browsers can't call roblox.com directly (CORS), so requests go through a proxy.
const API_GAMES = "https://games.ff-roproxy.com";
const API_UNIVERSE = "https://apis.ff-roproxy.com";
const REFRESH_MS = 60000;
const STAT_KEYS = ["visits", "ccu", "likes"];

const fmt = n => n == null ? "-" : (n >= 10000
    ? new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)
    : n.toLocaleString("en"));
const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }
};
const getJSON = async u => { const r = await fetch(u); if (!r.ok) throw new Error(r.status); return r.json(); };

async function getUniverseIds() {
    const cache = store.get("rbx-universes") || {};
    const places = [...new Set(GAME_LINKS.map(l => (l.match(/games\/(\d+)/) || [])[1]).filter(Boolean))];
    await Promise.all(places.filter(p => !cache[p]).map(async p => {
        try { cache[p] = (await getJSON(`${API_UNIVERSE}/universes/v1/places/${p}/universe`)).universeId; } catch { }
    }));
    store.set("rbx-universes", cache);
    return [...new Set(places.map(p => cache[p]).filter(Boolean))];
}

function renderStats(s, live) {
    for (const k of STAT_KEYS) document.querySelector(`[data-stat="${k}"]`).textContent = fmt(s[k]);
    const b = document.getElementById("live-badge");
    b.textContent = live ? "LIVE" : "OFFLINE";
    b.classList.toggle("off", !live);
}

async function loadStats() {
    try {
        const ids = await getUniverseIds();
        if (!ids.length) throw new Error("no games");
        const q = ids.join(",");
        const [g, v] = await Promise.all([
            getJSON(`${API_GAMES}/v1/games?universeIds=${q}`),
            getJSON(`${API_GAMES}/v1/games/votes?universeIds=${q}`)
        ]);
        const sum = (a, k) => a.reduce((t, x) => t + (x[k] || 0), 0);
        const s = { visits: sum(g.data, "visits"), ccu: sum(g.data, "playing"), likes: sum(v.data, "upVotes") };
        store.set("rbx-stats", s);
        renderStats(s, true);
    } catch {
        renderStats(store.get("rbx-stats") || {}, false);
    }
}
loadStats();
setInterval(() => { if (!document.hidden) loadStats(); }, REFRESH_MS);


/* ---------- Testimonials ---------- */
// Add one object per review. Use a quote, a screenshot, or both. Leave the list empty to hide the section.
//   quote: text of the review (optional)
//   img:   path to a screenshot, e.g. "media/reviews/mia.png" (optional)
//   alt:   describe the screenshot for screen readers (optional but recommended)
//   name / role: who said it and what you built for them
// Example:
//   { quote: "Delivered the whole save system in two days.", name: "Mia", role: "Owner of Game X", img: "media/reviews/mia.png", alt: "Discord message from Mia praising the save system" },
const TESTIMONIALS = [
    { quote: "The wig snatching system was done fast and it works great!", name: "Joel", role: "Previous Owner of Flame Trainer", img: "media/reviews/flametrainer.png", alt: "" },
    { quote: "Paul did a great job scripting for my FPS game!", name: "Kozak", role: "Owner of RO:Games", img: "", alt: "" },
    { quote: "The bladeball game Paul made for me was amazing. Everything worked as described and he was efficient and nice to work with.", name: "Ayham", role: "", img: "", alt: "Discord message from Mia praising the save system" },
    { quote: "Even though there were some troubles with payment due to my investor in the end, Paul handled everything calmly and efficiently. I would definitely work with him again.", name: "Vertical Axis", role: "Owner of Brainrot Survival", img: "", alt: "Discord message from Mia praising the save system" },
];

(function renderTestimonials() {
    if (!TESTIMONIALS.length) return;
    const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    document.getElementById("reviews-grid").innerHTML = TESTIMONIALS.map(t => {
        const img = t.img ? `<a href="${esc(t.img)}" target="_blank" rel="noopener"><img src="${esc(t.img)}" alt="${esc(t.alt || "Screenshot of a message from " + (t.name || "a client"))}" loading="lazy"></a>` : "";
        const quote = t.quote ? `<blockquote>${esc(t.quote)}</blockquote>` : "";
        const who = t.name ? `<figcaption><b>${esc(t.name)}</b>${esc(t.role)}</figcaption>` : "";
        return `<figure class="review">${img}${quote}${who}</figure>`;
    }).join("");
    document.getElementById("reviews").hidden = false;
    document.getElementById("nav-reviews").hidden = false;
})();

/* ---------- Project checkpoints ---------- */
(function initCheckpoints() {
    const items = [...document.querySelectorAll("#projects .proj")];
    const rail = document.getElementById("checkpoints");
    const projects = document.getElementById("projects");
    if (items.length < 2 || !rail) return;

    rail.innerHTML = '<i class="cp-fill"></i>' + P.map((p, i) =>
        `<button type="button" data-i="${i}" aria-label="Go to ${p.n}">
            <span class="cp-label">${p.n}</span><span class="dot"></span>
        </button>`).join("");
    const btns = [...rail.querySelectorAll("button")];

    rail.addEventListener("click", e => {
        const b = e.target.closest("button");
        if (b) items[b.dataset.i].scrollIntoView({ behavior: "smooth", block: "center" });
    });

    let queued = false;
    function update() {
        queued = false;
        const mid = innerHeight / 2;
        const centers = items.map(el => { const r = el.getBoundingClientRect(); return r.top + r.height / 2; });
        const pr = projects.getBoundingClientRect();
        rail.classList.toggle("show", pr.top < mid && pr.bottom > mid);

        // pos = fractional index of the project currently at the middle of the screen
        const last = items.length - 1;
        let pos;
        if (mid <= centers[0]) pos = 0;
        else if (mid >= centers[last]) pos = last;
        else {
            const i = centers.findIndex((c, k) => mid >= c && mid < centers[k + 1]);
            pos = i + (mid - centers[i]) / (centers[i + 1] - centers[i]);
        }
        rail.style.setProperty("--p", pos / last);
        const active = Math.round(pos);
        rail.dataset.label = P[active].n;
        btns.forEach((b, k) => {
            b.classList.toggle("active", k === active);
            b.classList.toggle("done", k <= active);
            b.toggleAttribute("aria-current", k === active);
        });
    }
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    addEventListener("load", queue); // images/videos change heights once loaded
    update();
})();