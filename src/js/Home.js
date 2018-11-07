import React, { Component } from 'react';
import iconPerson from "../icons/circular-avatar.png"

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openAberto: false,
            data: {
                adulto: 1,
                crianca: 0,
                bebe: 0,
            },
            error: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.verifyClick = this.verifyClick.bind(this);
    }

    handleClick() {
        if (!this.state.openAberto) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
            openAberto: !prevState.openAberto,
            edited: !prevState.edited,
        }));
    }


    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleClick();
    }
    verifyClick(data, sinal) {
        if (sinal == '+') {
            if ((this.state.data.adulto + this.state.data.crianca + this.state.data.bebe) < 9) {
                if (data == 'adulto') {
                    this.setState({ adulto: this.state.data.adulto++, error: '' })
                }
                if (data == 'crianca') {
                    if (this.state.data.adulto) {
                        if ((this.state.data.adulto > this.state.data.bebe) && (this.state.data.crianca < this.state.data.adulto * 4)) {
                            this.setState({ crianca: this.state.data.crianca++, error: '' })
                        } else {
                            this.setState({ error: '1 adulto, s/ bebés, pode adicionar até 4 crianças' });
                        }
                    } else {
                        this.setState({ error: 'Precisa de ir acompanhada de adulto' })
                    }
                }
                if (data == 'bebe') {
                    if (this.state.data.adulto) {
                        if ((this.state.data.crianca <= this.state.data.adulto) && (this.state.data.adulto > this.state.data.bebe)) {
                            this.setState({ bebe: this.state.data.bebe++, error: '' })
                        } else {
                            this.setState({ error: '1 adulto, c/ entre 0 - 1 crianças, pode adicionar 1 bebé ' })
                        }
                        if (this.state.data.crianca / 2 >= this.state.data.adulto) {
                            this.setState({ error: '1 adulto, c/ 2 ou mais crianças, não pode adicionar bebés' })
                        }
                    } else {
                        this.setState({ error: 'Precisa de ir acompanhada de adulto' })
                    }
                }
            } else {
                this.setState({ error: 'Não é possível selecionar mais do que 9 passageiros.' })
            }
        }
        if (sinal == '-') {
            if (data == 'adulto' && this.state.data.adulto > 0) {
                if ((this.state.data.adulto - 1) * 4 < this.state.data.crianca || (this.state.data.crianca > this.state.data.adulto - 1)) {
                    this.setState({ error: 'Para poder retirar os adultos necessita de retirar as crianças.' })
                } else if (this.state.data.adulto - 1 < this.state.data.bebe) {
                    this.setState({ error: 'Para poder retirar os adultos necessita de retirar os bebes.' })
                } else {
                    this.setState({ adulto: this.state.data.adulto--, error: '' })
                }
            } else if (data == 'crianca' && this.state.data.crianca > 0) {
                this.setState({ crianca: this.state.data.crianca--, error: '' })
            } else if (data == 'bebe' && this.state.data.bebe > 0) {
                this.setState({ bebe: this.state.data.bebe--, error: '' })
            } else {
                this.setState({ error: 'Erro' })
            }
        }
    }


    render() {

        let adulto;
        let crianca;
        let bebe;
        if (this.state.data.adulto) {
            if (this.state.data.crianca || this.state.data.bebe) {
                if (this.state.data.adulto > 1) {
                    adulto = this.state.data.adulto + ' Adultos, '
                } else {
                    adulto = this.state.data.adulto + ' Adulto, '
                }
            } else {
                if (this.state.data.adulto > 1) {
                    adulto = this.state.data.adulto + ' Adultos'
                } else {
                    adulto = this.state.data.adulto + ' Adulto'
                }
            }
        }
        if (this.state.data.crianca) {
            if (this.state.data.bebe) {
                if (this.state.data.crianca > 1) {
                    crianca = this.state.data.crianca + ' Crianças, '
                } else {
                    crianca = this.state.data.crianca + ' Criança, '
                }
            } else {
                if (this.state.data.crianca > 1) {
                    crianca = this.state.data.crianca + ' Crianças'
                } else {
                    crianca = this.state.data.crianca + ' Criança'
                }
            }
        }
        if (this.state.data.bebe) {
            if (this.state.data.bebe > 1) {
                bebe = this.state.data.bebe + ' Bebés'
            } else {
                bebe = this.state.data.bebe + ' Bebé'
            }
        }

        return (
            <div className="App" ref={node => { this.node = node; }}>
                <div className="mainBox">
                    <div className="title">Estado Default</div>
                    <div onClick={this.handleClick} style={{ width: '60%', marginTop: '4%' }} className="boxDefault">
                        <img className="person" alt='person' src={iconPerson} />
                        {(() => {
                            if (!this.state.edited && !this.state.run) {
                                return (
                                    <div className="txtBox">
                                        {adulto || ''} {crianca || ''} {bebe || ''}
                                    </div>)
                            } else {
                                return (
                                    <div className="txtBox">
                                        1 Adulto
                                    </div>)
                            }
                        })()}
                    </div>
                    {(() => {
                        if (this.state.openAberto) {
                            return (<div ref={this.setWrapperRef}>
                                <div style={{ marginTop: '9%' }} className="title">Estado Aberto</div>
                                <div style={{   border: '3px solid gray',width: '60%',  marginTop: '4%' }} className="boxDefault">
                                    <img className="person" alt='person' src={iconPerson} />
                                    <div className="txtBox">
                                        {adulto || ''} {crianca || ''} {bebe || ''}
                                    </div>
                                </div>
                                {(() => {
                                    if (this.state.error) {
                                        return (
                                            <div style={{ margin: '3%' }} className="alert alert-danger">
                                                <strong>Erro!</strong> {this.state.error}
                                            </div>)
                                    }
                                })()}
                                <div className="boxDefault">
                                    <ul>
                                        <li style={{ width: "95%" }}>
                                            <div className="listTxt">Adultos (+12 anos)</div>
                                        </li>
                                        <li>
                                            <div onClick={() => this.verifyClick('adulto', '-')} className="btn-optn">
                                                <div className="btn-txt">-</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="listNumber">{this.state.data.adulto}</div>
                                        </li>
                                        <li>
                                            <div onClick={() => this.verifyClick('adulto', '+')} className="btn-optn2">
                                                <div className="btn-txt">+</div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li style={{ width: "95%" }}>
                                            <div className="listTxt">Crianças (2-11 anos)</div>
                                        </li>
                                        <li>
                                            <div onClick={() => this.verifyClick('crianca', '-')} className="btn-optn">
                                                <div className="btn-txt">-</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="listNumber">{this.state.data.crianca}</div>
                                        </li>
                                        <li>
                                            <div onClick={() => this.verifyClick('crianca', '+')} className="btn-optn2">
                                                <div className="btn-txt">+</div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li style={{ width: "95%" }}>
                                            <div className="listTxt">Bebés (-2 anos)</div>
                                        </li>
                                        <li>
                                            <div onClick={() => this.verifyClick('bebe', '-')} className="btn-optn">
                                                <div className="btn-txt">-</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="listNumber">{this.state.data.bebe}</div>
                                        </li>
                                        <li>
                                            <div onClick={() => this.verifyClick('bebe', '+')} className="btn-optn2">
                                                <div className="btn-txt">+</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>)
                        }
                    })()}
                </div>
            </div>
        );
    }

}

