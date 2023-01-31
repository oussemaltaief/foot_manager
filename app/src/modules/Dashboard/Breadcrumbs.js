import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

const pathsMap = {
  users: 'Utilisateurs',
  teams: 'Equipes',
  players: 'Joeurs',
  coaches: 'Entraineurs',
  jeux: 'categories',
  lands: 'Terrains',
  products: 'Boutique',
  partners: 'Partenairs'
};

export default function Breadcrumbs({ path }) {
  const paths = path.split('/');

  paths.shift();

  return (
    <Breadcrumb style={{ margin: '1rem 0' }}>
      {paths.map((item, index, array) => (
        <Breadcrumb.Item key={item}>
          <NavLink to={`/${array.slice(0, index + 1).join('/')}`}>
            {pathsMap[item] || (index === paths.length - 1 && 'Détails')}
          </NavLink>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

Breadcrumbs.propTypes = {
  path: PropTypes.string.isRequired
};
