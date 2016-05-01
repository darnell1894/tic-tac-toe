"use strict";

function Model(row,column)
{
	var board = [];
	this.board = board;
	this.row = row;
	this.column = column;
	this.player = [];
	this.player[0] = 'X';
	this.player[1] = 'O';
	this.moves = 0;
	this.turn = this.player[0];
}

var model = {

	constructor: Model,

	newGame: function(){
		this.moves = 0;
		for(var i = 0; i < this.row; i++)
		{
			this.board[i] = [];
			for(var j = 0; j < this.column; j++)
			{
				this.board[i][j] = '';
			}
		}
	},
	
	makeMove: function(r,c){
		
		if(this.isValidMove(r,c))
		{
			this.board[r][c] = this.turn;
			this.moves++;
			this.turn = this.player[this.moves%2];
		}
		else
		{
			console.log("Invalid Move");
		}
	},
	
	isValidMove: function(r,c){
		
		if(this.board[r][c] === '')
		{
			return true;
		}
		return false;
	},
	
	isDraw: function(){

		for(var i = 0; i < this.row; i++)
		{
			for(var j = 0; j <this.column; j++)
			{
				if(this.board[i][j] === '')
				{
					return false;
				}
			}
		}
	
		return true;
	},
	
	checkWin: function(){
		
		if((this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) || (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]))
		{
			console.log(this.getSquare(1,1)+" wins diagonal");
			return this.getSquare(1,1);
		} // diagonal test
		
		for (var ii = 0; ii < this.row; ii++)
		{
			if(this.board[ii][0] === this.board[ii][1] && this.board[ii][1] === this.board[ii][2])
			{
				console.log(this.getSquare(ii,0)+" wins horizontal");
				return this.getSquare(ii,0);
			}
		} // horizontal test
		
		for (var jj = 0; jj < this.column; jj++)
		{
			if(this.board[0][jj] === this.board[1][jj] && this.board[0][jj] === this.board[2][jj])
			{
				console.log(this.getSquare(0,jj)+" wins vertical");
				return this.getSquare(0,jj);
			}
		} // vertical test
		
		if(this.isDraw())
		{
			console.log("draw");
			return "draw";
		}
		console.log("no winner");
		return false; // no winner or draw
	},
	
	
	
	getSquare: function(r, c) {
		return (this.board[r][c]);
	},

	copy: function(){
		
		var copy = new Model(this.row, this.column);
		copy.newGame();
		copy.moves = this.moves;
		copy.turn = this.turn;
		
		for(var i in this.board)
		{
			copy.board[i] = this.board[i].slice();
		} 
		
		return copy;
	},
	
	printBoard: function(){
		
		for(var i in this.board)
		{
			console.log(this.board[i]);
		}
		
	}

};

Model.prototype = model;

var game = new Model(3,3);

game.newGame();

game.makeMove(2,2);

game.makeMove(1,1);

game.makeMove(0,0);

game.makeMove(1,2);

game.makeMove(1,0);

game.makeMove(2,0);



game.makeMove(0,1);
game.makeMove(0,2);
game.makeMove(2,1);

game.checkWin();
//game.playerWin();
console.log(game);
game.printBoard();




function View()
{

}

var view = {
	constructor: View,

	updateView: function(model){
		for(var i = 0; i < model.row; i++)
		{
			for(var j = 0; j < model.column; j++)
			{
				
			}
		}
	}
};


View.prototype = view;

function Controller()
{

}

var controller = {
	constructor: Controller;
};

Controller.prototype = controller;




function eventDispatcher(listener,listening)
{ 

}

M = new Model(3,3);
M.makeMove(1,1,'X');
var v = new View(m, function(row,col,tdcell){

});
