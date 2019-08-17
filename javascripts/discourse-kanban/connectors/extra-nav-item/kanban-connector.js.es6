export default {
    shouldRender(args, component) {

        if (settings.discovery_mode != "category"
            && settings.discovery_mode != "tag"
            && settings.discovery_mode != "@"
        ) {
            console.log('Kanban connector unable to load - settings.discovery_mode has incorrect value.');
            return false;
        }

        if (settings.display_list === "") return true;

        const displayList = settings.display_list.split("|");

        const lookup = settings.discovery_mode === "category" ? component.get("category.slug") || "@"
            : settings.discovery_mode === "tag" ? component.get("selectedNavItem.tagId") || "@"
            : component.get("category.slug") || component.get("selectedNavItem.tagId") || "@"

        if (displayList.every(e => e.slice(0, 1) === "^")) {
            return !displayList.map(e => e.slice(1)).includes(lookup)
        }

        return displayList.includes(lookup)
    }
}