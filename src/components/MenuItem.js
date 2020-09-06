import React, {Component} from 'react'
import menuStyle from '../scss/menu.module.scss'

const request = require('superagent')

export default class MenuItem extends Component {
    constructor (props) {
        super(props)
        this.state = {
            items: null,
            isClick: 'N',
        }
    }

    componentWillMount () {
        request
            .get('/menus.json')
            .accept('application/json')
            .end((err, res) => {
                this.loadedJSON(err, res)
            })
    }

    loadedJSON (err, res) {
        if (err) {
            console.log('Not loaded JSON.')
            return
        }

        this.setState({
            items: res.body
        })
    }

    render () {
        if (!this.state.items) {
            return <div className="App">읽어오는 중..</div>
        }

        const lists = this.state.items.map((e, index) => {
            const detail = e.items.map((d, index) => {
                return (
                    <li key={index} data-show={d.isShow}>
                        <span className={menuStyle.name}>{d.name}</span>
                        <span className={menuStyle.price}>{d.price.toLocaleString()} 원</span>    
                    </li>
                )
            })

            return (
                <ul className={menuStyle.ul} key={index}>
                    <dt>{e.title}</dt>
                    {detail}
                </ul>
            )
        })

        return (
            <div>
                {lists}
            </div>
        )
    }
}