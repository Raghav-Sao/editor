import React, { Component } from 'react'
import { Divider, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { general, language } from 'Constants'
import Toolbar from 'Components/Toolbar'

import './Style.css'

const { TEXT, IMAGE } = general[language]

export default class SidebarComponent extends Component {
  state = { visible: true, type: IMAGE }

  slectType = type => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  showSibarContent = type => {
    this.setState({
      type,
    })
  }

  render() {
    const { visible, type } = this.state

    return (
      <div className="sidebar">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible={visible}>
            <Menu.Item
              as="a"
              className={type === TEXT ? 'active' : ''}
              onClick={() => this.showSibarContent(TEXT)}
            >
              <Icon name="text height" />
              {TEXT}
            </Menu.Item>
            <Menu.Item
              as="a"
              className={type === IMAGE ? 'active' : ''}
              onClick={() => this.showSibarContent(IMAGE)}
            >
              <Icon name="image" />
              {IMAGE}
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="layout" />
              Layout
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Divider horizontal inverted>
                {type}
              </Divider>
              <Toolbar type={type} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
