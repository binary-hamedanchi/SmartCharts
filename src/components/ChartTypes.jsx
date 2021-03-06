/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from '../store/Connect';
import Menu from './Menu.jsx';
import List from './List.jsx';
import { CloseIcon, SettingIcon } from './Icons.jsx';
import '../../sass/components/_chart-types.scss';

const ChartTypes = ({
    Type,
    Menu,
    menuOpen,
    TypeList,
    showAggregateDialog,
    closeMenu,
    isMobile,
}) => (
    <Menu
        className="ciq-menu ciq-display collapse ciq-chart-types"
    >
        <Menu.Title>
            <Type.icon
                className={`ic-icon-with-sub ${menuOpen ? 'active' : ''}`}
                tooltip-title={t.translate('Chart types')}
            />
        </Menu.Title>
        <Menu.Body>
            {isMobile ?
                <div className="cq-mobile-title">
                    <div className="mobile-title">{t.translate('Chart types')}</div>
                    <CloseIcon className="icon-close-menu" onClick={() => closeMenu()} />
                </div> : '' }
            <TypeList height={260}>
                {T => (
                    <React.Fragment>
                        <span className="left">
                            <T.icon  className={`margin ${T.active ? 'active' : ''}`} />
                            <span className="ciq-icon-text">{T.text}</span>
                        </span>
                        {T.settingsOnClick &&
                        <span
                            className="ciq-aggregate-setting"
                            onClick={() => showAggregateDialog(T.id)}
                        >
                            <SettingIcon />
                        </span>}
                    </React.Fragment>
                )}
            </TypeList>
        </Menu.Body>
    </Menu>
);

export default connect(({ chartType }) => ({
    Type: chartType.type,
    setOpen: chartType.setOpen,
    showAggregateDialog: chartType.showAggregateDialog,
    menuOpen: chartType.menu.open,
    Menu: chartType.menu.connect(Menu),
    TypeList: chartType.list.connect(List),
    closeMenu: chartType.menu.onTitleClick,
    isMobile: chartType.mainStore.chart.isMobile,
}))(ChartTypes);
