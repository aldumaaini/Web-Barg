import React from "react";

import Select from "react-select";

import { withTranslation } from "react-i18next";

const UsersDropDown = ({ users, onOptionsListSelected }) => {
  let usersList = users.map((opt) => ({
    label: `${opt.FullName} (${opt.phone})`,
    value: opt.userID,
  }));

  return (
    <div style={{ marginBottom: 40 }}>
      <Select
        options={usersList}
        isSearchable={true}
        placeholder="search by phone number"
        onChange={(opt) => onOptionsListSelected(opt)}
      />
    </div>
  );
};

export default withTranslation()(UsersDropDown);
