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
