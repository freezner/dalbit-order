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
        console.log('REACT_APP_API_URL: ' + process.env.REACT_APP_API_URL)
        request
            .get(process.env.REACT_APP_API_URL + '/item/list')
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
                var price = ""
                var isHotText = ""
                var isHotStyle = menuStyle.hotAndIced

                if (d.price_min !== undefined) {
                    price = d.price_min.toLocaleString() + " ~ " + d.price.toLocaleString() + "원"
                } else {
                    price = d.price.toLocaleString() + "원"
                }

                

                if (d.is_hot !== undefined) {
                    switch(d.is_hot) {
                        case 1: 
                            isHotText = "Hot Only";
                            isHotStyle = menuStyle.onlyHot;
                            break
                        
                        case 2: 
                            isHotText = "Iced Only";
                            isHotStyle = menuStyle.onlyIced;
                            break
                        
                        case 3: 
                            isHotText = "Hot / Iced";
                            break
                        
                        default: 
                            isHotText = ""
                    }
                } else {
                    isHotText = ""
                }

                return (
                    <li key={index} data-show={d.isShow}>
                        <span className={menuStyle.name}>
                            {d.name}
                            <span className={isHotStyle}>{isHotText}</span>
                        </span>
                        
                        <span className={menuStyle.price}>{price}</span>    
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