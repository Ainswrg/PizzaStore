import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={520}
    viewBox="0 0 280 520"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="28" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="420" rx="10" ry="10" width="95" height="27" />
    <rect x="125" y="410" rx="22" ry="22" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
