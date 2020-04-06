import React from 'react'
import axios from 'axios'
import '../styles/interface.css'

export default class Interface extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nums: {
                button1: {number: 1, name: 'button1'},
                button2: {number: 2, name: 'button2'},
                button3: {number: 3, name: 'button3'},
            },
            score: 0, 
            turns: 10,
            counter: 0,
            attempts: 0
            }
    }

    buttonHandler = (e)  => {
        let selectedNum = 0
        for(let item in this.state.nums){
            if(item !== e.name){
                document.querySelector(`.${item}`).style.background = 'black'
            }                  
            document.querySelector(`.${e.name}`).style.background = 'green'
            selectedNum = e.number            
        }
        this.submitHandler(selectedNum, this.state.counter)
    }

    submitHandler = (num, counter) => {
        let random = Math.floor(Math.random() * 3) + 1; 
        
        if(random === num){
            counter = counter += 1
        } else if(random !== num){
            counter = counter -= 1
        }

        this.prismHandler(counter)

        if(this.state.turns <= 1){
            this.setState({
                counter: counter,
                attempts: this.state.attempts + 1,
                turns: 1
            })
        } else {
            this.setState({
                counter: counter,
                attempts: this.state.attempts + 1,
                turns: this.state.turns - 1
            })
        }
    }

    prismHandler = (counter) => {
        if(counter === 0){
            this.updatePrism('100px', 'green', '50px')
        } else if(counter === 3){
            this.updatePrism('150px', 'teal', '75px')
        } else if(counter === 2){
            this.updatePrism('200px', 'white', '100px')
        } else if(counter === 1){
            this.winLossHandler('400px', 'white', '200px', true, this.state.turns) 
            document.querySelector('.triangle').style.animationIterationCount = 0           
        } else if(counter === -1){
            this.updatePrism('50px', 'maroon', '25px')
        } else if(counter === -2){
            this.updatePrism('24px', 'purple', '12px')
        } else if(counter === -3){
            this.winLossHandler('12px', 'black', '6px', false, this.state.turns)
        } 
    }

    updatePrism = (bb, color, borderLR,) => {
        let prism = document.querySelector('.triangle')
        prism.style.borderBottom = `${bb} solid ${color}`;
        prism.style.borderLeft = `${borderLR} solid transparent`;
        prism.style.borderRight = `${borderLR} solid transparent`;
        prism.style.transition = "3s";
    }

    winLossHandler = (bb, color, borderLR, result, sum) => {
        let prism = document.querySelector('.triangle')
        prism.style.borderBottom = `${bb} solid ${color}`;
        prism.style.borderLeft = `${borderLR} solid transparent`;
        prism.style.borderRight = `${borderLR} solid transparent`;
        prism.style.transition = "6s";
        prism.style.opacity = "0";

        if(result === true){ 
            this.setState({
                turns: 10,
                counter: 0,
                score: this.state.score += sum - 1
            })    
            this.nextRoundButton()
        } else if(result === false && this.state.score > 0){
            this.postStats()
            document.querySelector('.points-board').style.transform = "translate(0px, 0px)"
            document.querySelector('.points-board').style.opacity = "1"
            document.querySelector('.points-board').style.transition = "3s"
        } else {
            this.setState({
                score: 0,
                turns: 0,
                counter: 0,
                attempts: 0
            })
            this.playAgain()
        }
    }

    restartHandler = () => {
        this.setState({
            score: 0,
            turns: 10,
            counter: 0,
            attempts: 0
        })
        
        document.querySelector('.playAgain').style.opacity = '0'
        document.querySelector('.playAgain').style.transform = 'translate(-1000px, 0px)'

        document.querySelector('.points-board').style.transform = "translate(-1000px, 0px)"
        document.querySelector('.points-board').style.opacity = '0'
        document.querySelector('.points-board').style.transition = "4s"

        this.defaultPrism()
    }

    defaultPrism = () => {
        let prism = document.querySelector('.triangle')
        prism.style.borderBottom = "100px solid green";
        prism.style.borderLeft = "50px solid transparent";
        prism.style.borderRight = "50px solid transparent";
        prism.style.transition = "3s";
        prism.style.opacity = "1";
        prism.style.animationIterationCount = 'infinite'
    }

    nextRoundButton = () => {
        document.querySelector('.nextRound').style.transform = "translate(0px, 0px)"
        document.querySelector('.nextRound').style.opacity = "1"
    }

    nextRound = () => {
        this.setState({
            turns: 10,
            counter: 0,
            score: this.state.score
        })
        document.querySelector('.nextRound').style.opacity = '0'
        document.querySelector('.nextRound').style.transition = '3s'        

        this.defaultPrism()
    }

    playAgain = () => {
        document.querySelector('.playAgain').style.opacity = '1'    
        document.querySelector('.playAgain').style.transform = 'translate(0px, 0px)'
    }


    postStats = () => {

        let userStats = {
            user_id: this.props.userInfo.userID,
            score: this.state.score,
            rounds: 1,
            turns: this.state.turns,
            awards: 'No Awards',
            date: '1/20/22',
            rank: '1st place'
        }

        console.log(userStats)

        axios.post(`${process.env.REACT_APP_USERSTATS}`, userStats)
            .then(response => {
                console.log(response)
        })
        .catch(error => {
            console.log("There was an error posting your stats", error)
        })
    }
 

    
    render(){      
        //console.log("COUNTER: ",this.state.counter)
        //console.log("SCORE: ",this.state.score)
        //console.log("TURNS: ", this.state.turns)
        //console.log("ATTEMPTS", this.state.attempts)
        return(
            <div>
                <h1 className="header">Hyper Prism</h1>
                <hr style={{width:'100%', borderBottomColor: 'green', boxShadow: "1px 2px 2px 1px green"}} /> 
                <div className="container">
                    <span className="span-container"> 
                        <span> @anon</span>
                        <span style={{color: "white"}}>Score: {this.state.score} </span> 
                    </span>
                    <div className="triangle"></div> 
                </div> 
                <div className='points-board'>
                    <h2>Leader Board</h2>
                    {this.props.leaderBoard.map((item, key) => (
                        <p>@john: {item.score}</p> 
                    ))}
                    <p className='points-board-restart' onClick={this.restartHandler}>Play Again?</p>
                </div> 
                <div className='nextRound-container'> 
                    <p className='nextRound' onClick={this.nextRound}>Begin Next Round</p>
                </div> 
                <div className='playAgain-container'> 
                    <p className='playAgain' onClick={this.restartHandler}>Try Again?</p>
                </div> 
                <div className='controls-container'> 
                    <div className="numbers"> 
                        <div onClick={this.buttonHandler.bind(this, this.state.nums.button1)}>
                            <h1 className="choice1 button1">I</h1>
                        </div> 
                        <div onClick={this.buttonHandler.bind(this, this.state.nums.button2)}> 
                            <h1 className="choice1 button2" >II</h1>
                        </div> 
                        <div onClick={this.buttonHandler.bind(this, this.state.nums.button3)}> 
                            <h1 className="choice1 button3">III</h1>
                        </div> 
                    </div>  
                    <div className="controls">
                        <div onClick={this.restartHandler} class = "restart">Restart</div>
                        <div type='submit'>Menu</div>
                    </div>
                </div>   
                <div className="round2">Begin Next Round</div> 
            </div> 
        )
    }
}



