import { useAuth0 } from "@auth0/auth0-react";
import { Callout, Card, Intent, Tab, TabId, Tabs } from "@blueprintjs/core";
import React from "react";
import { Perf } from "./Perf";
import { PositionList } from "./PositionList";
import { Settings } from "./Settings";
import { Transactions } from "./Transactions";


export function Tracker() {

    const defTab: TabId = "Positions";
    const [currentTab, setCurrentTab] = React.useState(defTab);
    const { isAuthenticated } = useAuth0();
    const handleNavbarTabChange = (navbarTabId: TabId) => setCurrentTab(navbarTabId.toString());

    const DemoDataCallout = () => {
        if(!isAuthenticated) {
        return (
        <Callout title="Demo Data" intent={Intent.WARNING}>
                This data is for demonstration purposes only and will not be saved. 
                To track your own data, please sign up for an account.
             </Callout>
        );
        } else {
            return <div/>
        }
    }

    return(
        <Card>
            <DemoDataCallout/>
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
        <Tab id="Settings" title="Settings" panel={<Settings />} />
    </Tabs>
    </Card>
    );
}