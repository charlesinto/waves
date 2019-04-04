import React, { Component } from 'react';
import UserLayout from "../../HOC/UserLayout";
import ManageBrand from "./ManageBrand";
import ManageWood from './ManageWood';

class ManageCategories extends Component {
    render() {
        return (
            <div>
                <UserLayout>
                    <ManageBrand/>
                    <ManageWood/>
                </UserLayout>
            </div>
        );
    }
}

export default ManageCategories;