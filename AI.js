function getBestOutcome(boardPosition, isMaximizingPlayer)
{
	var bestOutcome;
	var currentMove;
									//console.log('enter');
	if (isMaximizingPlayer)
	{
		bestOutcome = {
			row: 0,
			column: 0,
			point: -Infinity
		};
		
		currentMove = {
			row: 0,
			column: 0,
			point: -Infinity
		};
	} 
	else
	{
		bestOutcome = {
			row: 0,
			column: 0,
			point: Infinity
		};
		
		currentMove = {
			row: 0,
			column: 0,
			point: Infinity
		};
	}

	if(boardPosition.checkWin() === "draw")
	{
		bestOutcome.point = 0;
		return bestOutcome;
	}
	if(boardPosition.checkWin() === 'X')
	{
		bestOutcome.point = 1;
		return bestOutcome;
	}
	if(boardPosition.checkWin() === 'O')
	{
		bestOutcome.point = -1;
		return bestOutcome;
	}
	
	for (var i = 0; i < boardPosition.row; i++)
	{
		for (var j = 0; j < boardPosition.column; j++)
		{
			var currentBoard = boardPosition.copy(); // copies board

			if(currentBoard.isValidMove(i,j))  // only exicutes for valid moves
			{
				currentBoard.makeMove(i,j); // Makes move on copied board
				
				if (isMaximizingPlayer)
				{
					currentMove = getBestOutcome(currentBoard, false); // recursive step for maximizing
					
					if (currentMove.point > bestOutcome.point)
					{
						
						currentMove.row = i;
						currentMove.column = j;
						bestOutcome = currentMove;
						
					} // if (currentMove.point > bestOutcome.point)
				} // if (isMaximizingPlayer)
				else
				{
					currentMove = getBestOutcome(currentBoard, true); // recursive step for nonMaximizing
					
					if (currentMove.point < bestOutcome.point)
					{
						
						currentMove.row = i;
						currentMove.column = j;
						bestOutcome = currentMove;
						
					} // if (currentMove.point < bestOutcome.point)
				} // else
			} // if(currentBoard.isValidMove(i,j))
		} // for (var j = 0; boardPosition.column; j++)
	} // for (var i = 0; i < boardPosition.row; i++)
	//console.log(bestOutcome);
	
	return bestOutcome;
} // getBestOutcome
