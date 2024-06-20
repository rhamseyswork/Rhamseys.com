class NavBarData {
  constructor() {
    this.title = "Rhamseys Garcia";
    this.tabs = {
      "Home": [{ Display: "Public", Static: true, Path: "" }],
      "About": [
        { label: "About", Display: "Public", Static: true, Path: "About/About" },
        { label: "Resume", Display: "Public", Static: true, Path: "About/Resume" },
        { label: "Portfolio", Display: "Public", Static: true, Path: "About/Portfolio" }
      ],
      "Merch": [{ Display: "Public", Dynamic: true, Path: "Merch" }],
      "Blog": [{ Display: "Public", Dynamic: true, Path: "Blog/Blog" }],
      "Contact": [{ Display: "Public", Static: true, Path: "Contact" }]
    };
  }

  getTabsRoutes() {
    const { tabs } = this;
    const routes = [];

    Object.keys(tabs).forEach(tabKey => {
      tabs[tabKey].forEach(subTab => {
        routes.push({
          path: `/${subTab.Path}`,
          tab: subTab.label || tabKey
        });
      });
    });

    return routes;
  }
}

const navBarData = new NavBarData();

export default navBarData;
