import { manageButtons } from "./modules/buttonManager.js";
import { customScroll } from "./modules/customScroll.js";
import { init } from "./modules/dropdownArrows.js";
import { fixStyles } from "./modules/stylesFixer.js";

window.scrollTo(0,0)

fixStyles()
//customScroll()
init()
manageButtons()