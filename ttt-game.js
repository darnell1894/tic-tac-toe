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
		return ''; // no winner or draw
	},
	
	
	
	getSquare: function(r, c) {
		return (this.board[r][c]);
	},
	
	isGameOver: function(){
		return (this.isDraw() || this.checkWin() !== '');
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
//game.makeMove(2,1);

console.log(game.isGameOver());
console.log(game);
game.printBoard();


function getBestOutcome(boardPosition, isMaximizingPlayer)
{
	var bestOutcome;
	
	if (isMaximizingPlayer)
	{
		bestOutcome = {
			row: 0,
			column: 0,
			point: 1
		};
	}
	else
	{
		bestOutcome = {
			row: 0,
			column: 0,
			point: -1
		};
	}
	
	if(boardPosition.checkWin() === "draw")
	{
		bestOutcome.point = 0;
		return bestOutcome.point;
	}
	if(boardPosition.checkWin() === 'X')
	{
		bestOutcome.point = 1;
		return 1;
	}
	if(boardPosition.checkWin()=== 'O')
	{
		bestOutcome.point = -1;
		return bestOutcome.point;
	}
	
	
	for (var i = 0; i < boardPosition.row; i++)
	{
		for (var j = 0; boardPosition.column; j++)
		{
			// some type of recusion
			var currentBoard = boardPosition.copy();
			
			currentBoard.makeMove(i,j);
			
			if (isMaximizingPlayer)
			{
				var currentMove = getBestOutcome(currentBoard, false);
				
				if (currentMove.point > bestOutcome.point)
				{
					bestOutcome = currentMove;
				} // if (currentMove.point > bestOutcome.point)
			} // if (isMaximizingPlayer)
			else
			{
				var currentMove = getBestOutcome(currentBoard, true);
				
				if (currentMove.point < bestOutcome.point)
				{
					bestOutcome = currentMove;
				} // if (currentMove.point < bestOutcome.point)
			} // else
			
		} // for (var j = 0; boardPosition.column; j++)
	} // for (var i = 0; i < boardPosition.row; i++)
	
	return bestOutcome;
	
} // getBestOutcome
