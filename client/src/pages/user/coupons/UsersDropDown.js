import React from "react";

import Select from "react-select";

import { withTranslation } from "react-i18next";

const UsersDropDown = ({ users, onOptionsListSelected }) => {
  let usersList = users.map((opt) => ({
    label: opt.FullName,
    value: opt.userID,
  }));

  return (
    <>
      <Select
        options={usersList}
        onChange={(opt) => onOptionsListSelected(opt)}
      />
    </>
  );
};

export default withTranslation()(UsersDropDown);
