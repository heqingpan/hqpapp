///// class LF.TimeBase
//
//include LF.LinkListNode
//
//TimeSender={lastTime,interval,call,makeRemove,isRemove}
LF.TimeBase=function(interval)
{
	var _interval;
	if(interval&&interval>10)
	{
		_interval=interval;
	}
	else
	{
		_interval=20;
	}
	if(LF.TimeBase._collections[_interval])
	{
		return LF.TimeBase._collections[_interval];
	}
	LF.TimeBase._collections[_interval]=this;

	//filed
	var This=this;
	var _tiggerRoot=new LF.LinkListNode();
	var _lastNode=_tiggerRoot;
	var _isStart=false;

	//funcion;
	var addEvent;
	var visit;
	var callFunc;
	var start;

	//visit function of visiter pattern
	visit=function(sender)
	{
		if(sender.makeRemove)
		{
			//don't added is removed
			sender.isRemove=true;
			return;
		}
		sender.lastTime-=_interval;
		if(sender.lastTime<=0)
		{
			sender.call();
			sender.lastTime+=sender.interval;
		}
		addEvent(sender);
	};

	addEvent=function(sender)
	{
		_lastNode.insertAfter(sender);
		_lastNode=_lastNode.nextNode;
		if(!_isStart)
		{
			_isStart=true;
			start();
		}
	};

	callFunc=function()
	{
		if(_isStart)
		{
			start();
		}
		var newRoot=_tiggerRoot;
		_tiggerRoot=new LF.LinkListNode();
		_lastNode=_tiggerRoot;
		if(!newRoot.nextNode)
		{
			_isStart=false;
			return;
		}
		newRoot.nextNode.visitThisToEnd(visit);
		if(!_tiggerRoot.nextNode)
		{
			_isStart=false;
		}
	};

	start=function()
	{
		window.setTimeout(callFunc,_interval);
	};

	this.add=function(sender)
	{
		addEvent(sender);
	};
	this.getInterval=function()
	{
		return _interval;
	};
}
LF.TimeBase._collections={};
///// end class LF.TimeBase
