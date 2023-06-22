import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link/link';
import Search from 'components/shared/search';
import MENUS from 'constants/menus';

import { ChatWidgetTrigger } from '../chat-widget';

import Item from './item';

const Sidebar = ({ className = null, sidebar, currentSlug }) => (
  <aside
    className={clsx(
      'relative col-start-1 col-end-4 max-w-[254px] pb-20 pt-[111px] before:absolute before:-right-5 before:top-0 before:z-10 before:h-full before:w-screen before:bg-gray-new-98 dark:before:bg-gray-new-10 lg:hidden',
      className
    )}
  >
    <Search className="z-30" />
    <nav className="relative z-20 mt-8">
      <ChatWidgetTrigger className="mb-3.5 flex" isSidebar />
      <ul>
        {MENUS.docSidebar.map(({ icon: Icon, title, slug }, index) => (
          <li className="py-[7px] first:pt-0 last:pb-0" key={index}>
            <Link className="group flex items-center space-x-3" to={slug}>
              <span className="relative flex h-6 w-6 items-center justify-center rounded bg-[linear-gradient(180deg,#EFEFF0_100%,#E4E5E7_100%)] before:absolute before:inset-px before:rounded-[3px] before:bg-[linear-gradient(180deg,#FFF_100%,#FAFAFA_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_31.25%,rgba(255,255,255,0.05)_100%)] dark:before:bg-[linear-gradient(180deg,#242628_31.25%,#1D1E20_100%)]">
                <Icon className="relative z-10 h-3 w-3 text-gray-new-30 dark:text-gray-new-80" />
              </span>
              <span className="text-sm font-medium leading-tight transition-colors duration-200 group-hover:text-secondary-8 dark:group-hover:text-green-45">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mt-9">
        {sidebar.map((item, index) => (
          <Item {...item} currentSlug={currentSlug} key={index} />
        ))}
      </ul>
    </nav>
  </aside>
);

export const sidebarPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string,
    ariaLabel: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.exact({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string,
        ariaLabel: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.any),
      })
    ),
  })
).isRequired;

Sidebar.propTypes = {
  className: PropTypes.string,
  sidebar: sidebarPropTypes,
  currentSlug: PropTypes.string.isRequired,
};

export default Sidebar;
