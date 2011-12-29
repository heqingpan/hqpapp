/**
 * class LF.TimeBase
 * include LF.LinkListNode
 *
 * 这个是定时的基础类，库中任何定时的功能都是封装调用它来实现，
 * 以实现共享setTimeout，节省资源的目的。
 * 相关作用可以参考LF.Timer。
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
		_interval=40;
	}

	//单例模式
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
		if(_lastNode===sender.tiggerNode)
		{
			_lastNode=sender.tiggerNode.prevNode;
		}
	}
	this.getInterval=function()
	{
		return _interval;
	};
}
// 单例集合
LF.TimeBase._collections={};
// end class LF.TimeBase
/** lpdate 2011.12.29 09.50 heqingpan
 * 更新remove使_lastNode能正常工作——永远指向最后的结点
 *
 */
