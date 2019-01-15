import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { general, language } from 'Constants'
import Toolbar from 'Components/Toolbar'

import { actionCreator } from 'store/actionCreator'

import './Style.css'

const { TEXT, IMAGE, TEMPLATES } = general[language]

class SidebarComponent extends Component {
  state = { visible: true, type: TEMPLATES }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_TEMPLATES' })
  }

  slectType = type => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  showSibarContent = type => {
    this.setState({
      type,
    })
  }

  render() {
    const {
      state: { visible, type },
      props: { templates },
    } = this

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
            <Menu.Item
              as="a"
              className={type === TEMPLATES ? 'active' : ''}
              onClick={() => this.showSibarContent(TEMPLATES)}
            >
              <Icon name={`${type === TEMPLATES ? 'open' : ''} folder outline`} />
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

const mapStateToProps = ({ templateReducer: templates }) => ({ templates })
export default connect(mapStateToProps)(SidebarComponent)
