import React, {Component} from 'react';
import Cell from './cell.js';
import { connect } from 'react-redux';
import { moveHero, removeItem, pickupPotion, pickupWeapon, hitEnemy, dmgHero, gainXP, levelUp, newLevel, newPosition, resetHero } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { randomInclusive } from '../utils/index.js'


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerDead: false,
      bossDead: false,
      seeAll: false
    };
    this.handleKey = this.handleKey.bind(this);
    this.findNeighbors = this.findNeighbors.bind(this);
    this.getMovedTo = this.getMovedTo.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }
    componentWillMount(){
      this.props.newLevel();
    }
    componentDidMount(){      
      window.addEventListener('keydown', this.handleKey);
    }
    componentWillUnmount(){
      window.removeEventListener('keydown', this.handleKey);
    }


    //mapping a new array of neighbors, top, left, bot, right and giving them a new prop based on direction
    findNeighbors(){
      let heroPos = this.props.hero.position;
      let layout = this.props.layout;
      //flatten to 1d array for filtering to get small array for 4 neighbors
      let neighbors = []; 
      for (let i=0; i<layout.length; i++) {
        neighbors.push(...layout[i])
      }
      return neighbors.map((cell)=>{
        let xCoord = cell.position[0];
        let yCoord = cell.position[1];
          if (xCoord === heroPos[0] && yCoord === heroPos[1]-1) {
            return Object.assign({}, cell, {top: true})
          }
          else if (xCoord === heroPos[0]-1 && yCoord === heroPos[1]) {
            return Object.assign({}, cell, {left: true})
          }
          else if (xCoord === heroPos[0] && yCoord === heroPos[1]+1) {
            return Object.assign({}, cell, {bot: true})
          }
          else if (xCoord === heroPos[0]+1 && yCoord === heroPos[1]) {
            return Object.assign({}, cell, {right: true})
          }
          else {
            return cell;
          }
        }).filter((cell)=>{
          return cell.top || cell.left || cell.right || cell.bot;
        })
    }
    
    //gets the object neighbor we are moving to
    getMovedTo(neighbors, pos){
      for (let i=0; i<neighbors.length; i++) {
        for (let prop in neighbors[i]){
          let X = neighbors[i][prop][0];
          let Y = neighbors[i][prop][1];
          if (X === pos[0] && Y === pos[1]) {
            return neighbors[i];
          }
        }
      }
    }
    
    //turn on the lights
    handleClick(){
      this.setState({seeAll: !this.state.seeAll});
    }
    
    //restart the game on death/win
    handleRestart(){
      this.setState({playerDead: false, bossDead: false});
      this.props.newLevel(1);
      this.props.resetHero();
    }
    
    //big handle movement function
    handleKey(e){
      e.preventDefault();
      if (!this.state.playerDead && !this.state.bossDead) {
        let heroPos = this.props.hero.position;
        let neighbors = this.findNeighbors();
        
        
        // MOVEMENT
        // Get the x,y of the space we are moving to
        let move = [];
        switch (e.keyCode) {
          case 37:
            //left
            move = [heroPos[0]-1, heroPos[1]]
            break;
          case 38:
            //top
            move = [heroPos[0], heroPos[1]-1]
            break;
          case 39:
            //right
            move = [heroPos[0]+1, heroPos[1]]
            break;
          case 40:
            //bot
            move = [heroPos[0], heroPos[1]+1]
            break;
          default: 
            move = [heroPos[0], heroPos[1]];
            break;
        }
        
        // get the cell object you are moving to
        let movingTo = this.getMovedTo(neighbors, move)

        //based on what it is, do various things
        if (movingTo !== undefined) {
          if (!movingTo.wall && !movingTo.enemy) {
            this.props.moveHero(move)
            //pick up a potion
            if (movingTo.potion){
              let hp = this.props.hero.hp + movingTo.potion;
              this.props.removeItem(move); 
              this.props.healHero(hp); 
            }
            //pick up a weapon
            else if (movingTo.weapon){ 
              this.props.removeItem(move) 
              this.props.getWeaponHero(movingTo.weapon);
            }
            //move to a new level
            else if (movingTo.stairs){ 
              switch (movingTo.currentStage) {

                case 1:
                  this.props.newLevel(2)
                  break;
                case 2:
                  this.props.newLevel(3)
                  break;
                case 3: 
                  this.props.newLevel(4)
                  break;
                default:
                  this.props.newLevel(1)
                  break;          
              }
              this.props.newPosition();
            }
          }
          
          //fighting enemy
          else if (movingTo.enemy) {
            //HERO STATS

            //hero attack is level + att of weapon
            let hero = this.props.hero;
            let heroAttack = hero.level + hero.weapon.att;
            let heroHP = this.props.hero.hp;
            let heroXP = this.props.hero.xp;
            let heroLvl = this.props.hero.level;

            // ENEMY STATS
            let enemy = movingTo.enemy;
            let enemyHP = enemy.hp;
            let enemyXP = enemy.xp;
            
            //ATTACK ENEMY
            enemyHP -= heroAttack;
            this.props.hitEnemy(move, enemy, enemyHP);


            //ATTACK HERO
            // enemy attack is based off level
            let enemyAttack = 0;  
            switch (movingTo.enemy.lvl){
              case 1:
                enemyAttack = randomInclusive(4,6);
                break;
              case 2: 
                enemyAttack = randomInclusive(8,10);
                break;
              case 3:
                enemyAttack = randomInclusive(12,14);
                break;
              case 4: 
                enemyAttack = randomInclusive(16,18);
                break;
              case 5: 
                enemyAttack = randomInclusive(22,26);
                break;
            }           
            heroHP -= enemyAttack;
            this.props.dmgHero(heroHP);
            
            // CHECK IF KILLED/HERO DEAD/XP BOOST
            if (enemyHP <= 0 && heroHP > 0) {
              //not dead and killed enemy, get xp
              let totalXP = heroXP + enemyXP;
              this.props.gainXP(totalXP)
              

              // CHECK LEVEL UP?
              // hitpoint boost on level up
              let levelupHP = heroHP + 50
                          
              //XP Thresholds: 35, 85, 120
              if (totalXP >= 35 && totalXP < 85 && heroLvl === 1) {
                this.props.levelUp(2, levelupHP)
                this.setState({levelUp: true})
                this.animateLvl();
              }
              if (totalXP >= 85 && totalXP < 120 && heroLvl === 2){this.props.levelUp(3, levelupHP)}
              if (totalXP >= 120 && heroLvl === 3){this.props.levelUp(4, levelupHP)}
              if (movingTo.boss) {
                this.setState({bossDead: true})
              }
            }
            else if (heroHP <= 0) {
              //set local state as a flag 'hero dead' to add some div message
              this.setState({playerDead: true})
            }            
          }
        }
      }

    }

  render() {
    
    //display xp level of hero
    let xpStatus = 0;
    let heroXP = this.props.hero.xp
    switch (this.props.hero.level) {
      case 1:
      xpStatus = `${heroXP} / 35`
      break;
      case 2:
      xpStatus = `${heroXP} / 85`
      break;
      case 3:
      xpStatus = `${heroXP} / 120`
      break;
      default: 
      xpStatus = 'MAX'
    }
    
    let cells = this.props.layout.map((row, rowNum)=>{
      return row.map((cell,cellNum)=>{
        let heroPos = this.props.hero.position;
        // if within hero sight radius
        if (!this.state.seeAll && ((cellNum <= heroPos[0]-5 || cellNum >= heroPos[0]+5) || (rowNum <= heroPos[1]-5 || rowNum >= heroPos[1]+5))){
          return <Cell key={cellNum+rowNum} hidden={true} />
        }
        // if hero
        else if (rowNum === heroPos[1] && cellNum === heroPos[0]) {
          return <Cell key={cellNum+rowNum} hero={true} /> 
        }
        // if potion
        else if (cell.potion) {
          return <Cell key={cellNum+rowNum} potion={true} />
        }
        // if weapon
        else if (cell.weapon) {
          return <Cell key={cellNum+rowNum} weapon={true} />            
        }
        // if boss
        else if (cell.boss) {
          return <Cell key={cellNum+rowNum} boss={true} />
        }
        // if enemy
        else if (cell.enemy) {
          return <Cell key={cellNum+rowNum} enemy={true} />            
        }
        // if stairs
        else if (cell.stairs) {
          return <Cell key={cellNum+rowNum} stairs={true} />            
        }
        else if (!cell.wall) {
          return <Cell key={cellNum+rowNum} room={true} />            
        }        
        else {
          return <Cell key={cellNum+rowNum} wall={true} />
        }
      })
    })
    
    let deadMessage = this.state.playerDead ? 'YOU DIED!!' : false;
    let winMessage = this.state.bossDead ? 'YOU WON!!' : false;
    
    let messageDiv = (
      <div 
      className='messageDiv' 
      style={(this.state.playerDead || this.state.bossDead) ? {opacity: 1} : {opacity: 0}}>
      <h4>{deadMessage || winMessage}</h4>
        <div className='refresh-button' 
        style={{margin: '0 auto'}} 
        onClick={this.handleRestart}>
          <i className="fa fa-2x fa-refresh" aria-hidden="true"></i>
        </div>
      </div>
    )

    return (
      <div>
        <div className='stats-and-key'>
          <div className='player-stats' style={{backgroundColor: 'white'}}>
            <h2>Hero Stats</h2>
            <h4><span className = 'stat-name'>Level</span>: {this.props.hero.level}</h4>          
            <h4><span className = 'stat-name'>Health</span>: {this.props.hero.hp}</h4>
            <h4><span className = 'stat-name'>Weapon</span>: {this.props.hero.weapon.name}</h4>
            <h4><span className = 'stat-name'>Experience</span>: {xpStatus} </h4>
          </div>
          <div className='key' style={{backgroundColor: 'white'}}>
            <h2 style={{textAlign: 'center'}}>Key</h2>
            <div><div className = 'key-cell' style={{backgroundColor: 'green'}}></div> = Potion </div> 
            <div><div className = 'key-cell' style={{backgroundColor: 'orange'}}></div> = Weapon </div>         
            <div><div className = 'key-cell' style={{backgroundColor: 'red'}}></div> = Enemy </div>
            <div><div className = 'key-cell' style={{backgroundColor: 'yellow'}}></div> = Boss </div>
            <div><div className = 'key-cell' style={{backgroundColor: 'purple'}}></div> = Stairs </div>
          </div>
        </div>
        <div className='see-all'>
          <div className='see-button' style={{margin: '0 auto'}} onClick={this.handleClick}><i className="fa fa-2x fa-lightbulb-o" aria-hidden="true"></i></div>
        </div>
        <div className='board-holder'>
          {messageDiv}
          <div className='board'>            
            {cells}
          </div>
        </div>
      </div>
    );
  }
}

//REDUX 

const mapStateToProps = (state) => {
  return { 
    layout: state.layout,
    hero: state.hero
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveHero: (newPos) => {dispatch(moveHero(newPos))},
    removeItem: (position) => {dispatch(removeItem(position))},
    healHero: (amt) => {dispatch(pickupPotion(amt))},
    getWeaponHero: (weapon) => {dispatch(pickupWeapon(weapon))},
    hitEnemy: (position, ene, hp) => {dispatch(hitEnemy(position, ene, hp))},
    dmgHero: (hp) => {dispatch(dmgHero(hp))},
    gainXP: (xp) => {dispatch(gainXP(xp))},
    levelUp: (lvl, hp) => {dispatch(levelUp(lvl, hp))},
    newLevel: (num) => {dispatch(newLevel(num))},
    newPosition: () => {dispatch(newPosition())},
    resetHero: () =>{dispatch(resetHero())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)