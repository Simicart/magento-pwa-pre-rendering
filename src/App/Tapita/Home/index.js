
import React from "react";
import HomeAbstract from '../../Core/Home/HomeAbstract';
import DefaultTheme from './Default'
import MatrixTheme from './Matrix'
import './style.css';
class Home extends HomeAbstract{

    renderTheme(){
        this.layout = 2;
        if(this.layout === 1){
            return <DefaultTheme/>
        }else if(this.layout === 2){
            return <MatrixTheme/>
        }
    }

    render(){
        return super.render()
    }
}
export default Home