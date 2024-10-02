const p1_btn = document.querySelector('#p1_score_update');
const p2_btn = document.querySelector('#p2_score_update');
const reset_btn = document.querySelector('#reset_btn');
const p1_score_display = document.querySelector('#p1_score_display');
const p2_score_display = document.querySelector('#p2_score_display');
const set_winning_score = document.querySelector('#set_winning_score')

let p1_score = 0;
let p2_score = 0;
let winning_score = 3;
let is_game_over = false;

set_winning_score.addEventListener('change',()=>{
    winning_score = parseInt(set_winning_score.value);
    reset();
})

p1_btn.addEventListener('click',()=>{
    if(!is_game_over){
        p1_score += 1;
        if(p1_score === winning_score){
            is_game_over = true;
            p1_score_display.classList.add('winner')
            p2_score_display.classList.add('loser')
        }
        p1_score_display.textContent = p1_score;
    }
})

p2_btn.addEventListener('click',()=>{
    if(!is_game_over){
        p2_score += 1;
        if(p2_score === winning_score){
            is_game_over = true;
            p1_score_display.classList.add('loser')
            p2_score_display.classList.add('winner')
        }
        p2_score_display.textContent = p2_score;
    }
})

reset_btn.addEventListener('click',reset)

function reset(){
    is_game_over = false;
    p1_score = 0;
    p2_score = 0
    p1_score_display.textContent = p1_score;
    p2_score_display.textContent = p2_score;
    p1_score_display.classList.remove('winner','loser')
    p2_score_display.classList.remove('winner','loser')
}