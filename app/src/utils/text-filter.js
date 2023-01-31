import React from 'react';
import { Input, Button } from 'antd';

function filterDropdown(
  key,
  { setSelectedKeys, selectedKeys, confirm, clearFilters }
) {
  return (
    <div
      style={{
        padding: 6,
        borderRadius: 4,
        background: '#fff',
        boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
      }}
    >
      <Input
        style={{
          width: 130,
          marginRight: 6
        }}
        ref={ele => {
          key && (this[key] = ele);
        }}
        placeholder="Filtre"
        // value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={confirm}
      />
      <Button
        style={{ marginRight: 6 }}
        type="primary"
        icon="filter"
        onClick={confirm}
      />
      <Button icon="close" onClick={clearFilters} />
    </div>
  );
}

function onFilterDropdownVisibleChange(key, visible) {
  if (key && visible) {
    setTimeout(() => {
      this[key].focus();
    });
  }
}

export default function textFilter(context, key) {
  return {
    filterDropdown: filterDropdown.bind(context, key),
    onFilterDropdownVisibleChange: onFilterDropdownVisibleChange.bind(
      context,
      key
    )
  };
}
