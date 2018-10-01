import React, { Component } from 'react'
import { Divider, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { general, language } from 'Constants'
import Toolbar from 'Components/Toolbar'

import './Style.css'

export default class SidebarComponent extends Component {
  state = { visible: true, type: 'NOTHING' }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  showSibarContent = type => {
    this.setState({
      type,
    })
  }

  render() {
    const { visible, type } = this.state
    const { TEXT, IMAGE } = general[language]

    return (
      <div className="sidebar">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible={visible}>
            <Menu.Item as="a" onClick={() => this.showSibarContent(TEXT)}>
              <Icon name="text height" />
              {TEXT}
            </Menu.Item>
            <Menu.Item as="a" onClick={() => this.showSibarContent(IMAGE)}>
              <Icon name="image" />
              {IMAGE}
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
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
