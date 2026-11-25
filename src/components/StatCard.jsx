import React from 'react';
import { Link } from 'react-router-dom';

export default function StatCard({ title, value, detail, to = '/requests' }) {
  return <Link className="stat" to={to}><p>{title}</p><strong>{value}</strong><small>{detail}</small></Link>;
}
