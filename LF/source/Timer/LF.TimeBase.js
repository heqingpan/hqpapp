/**
 * class LF.TimeBase
 * include LF.LinkListNode
 *
 * TimeSender={lastTime,interval,call,tiggerNode}
 */
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
	var _tiggerRoot=new LF.LinkListNode2();
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
		if(sender.isStop)
		{
			return;
		}
		sender.lastTime-=_interval;
		if(sender.lastTime<=0)
		{
			sender.call();
			sender.lastTime+=sender.interval;
		}
	};

	addEvent=function(sender)
	{
		_lastNode.insertAfter(sender);
		_lastNode=_lastNode.nextNode;
		sender.tiggerNode=_lastNode;
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
		if(_tiggerRoot==_lastNode)
		{
			_isStart=false;
			return;
		}
		_tiggerRoot.nextNode.visitThisToEnd(visit);
	};

	start=function()
	{
		window.setTimeout(callFunc,_interval);
	};

	this.add=function(sender)
	{
		addEvent(sender);
	};
	this.remove=function(sender)
	{
		sender.tiggerNode.prevNode.removeNextNode();
	}
	this.getInterval=function()
	{
		return _interval;
	};
}
LF.TimeBase._collections={};
// end class LF.TimeBase
