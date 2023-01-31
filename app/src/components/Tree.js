import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';

import { TREE_PAGES } from '../const';

const { TreeNode } = Tree;

class TreeAccess extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    selectedKeys: []
  };

  onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onCheck = checkedKeys => {
    const { onChange } = this.props;

    onChange && onChange(checkedKeys);
  };

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            disabled={this.props.disabled}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.props.accessControl}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(TREE_PAGES)}
      </Tree>
    );
  }
}
TreeAccess.propTypes = {
  accessControl: PropTypes.any,
  disabled: PropTypes.any,
  onChange: PropTypes.func
};

export default TreeAccess;
