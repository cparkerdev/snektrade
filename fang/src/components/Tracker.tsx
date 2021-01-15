import { Callout, Card, Intent, Tab, TabId, Tabs } from "@blueprintjs/core";
import React from "react";
import { Perf } from "./Perf";
import { PositionList } from "./PositionList";
import { Transactions } from "./Transactions";


export function Tracker() {

    const defTab: TabId = "Positions";
    const [currentTab, setCurrentTab] = React.useState(defTab);

    const handleNavbarTabChange = (navbarTabId: TabId) => setCurrentTab(navbarTabId.toString());

    return(
        <Card>
            <Callout title="Demo Data" intent={Intent.WARNING}>
                This data is for demonstration purposes only and will not be saved. 
                To track your own data, please sign up for an account.
            </Callout>
        <Tabs
        animate={true}
        id="navbar"
        large={false}
        onChange={handleNavbarTabChange}
        selectedTabId={currentTab}
    >
        <Tab id="Positions" title="Positions" className="bp3-dark" panel={<PositionList />} />
        <Tab id="Transactions" title="History" panel={<Transactions />} />
        <Tab id="Reports" title="G/L" panel={<Perf />} />
    </Tabs>
    </Card>
    );
}