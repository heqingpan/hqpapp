/**
 * class LF.TimeSender
 *
 */
LF.TimeSender=function(func,interval)
{
	this.interval=interval||100;
	this.lastTime=this.interval;
	this.call=func||LF.defaultFunc;
	this.isStop=true;
	this.tiggerNode=null;
}
// end class LF.TimeSender


/**
 * class LF.Time
 * include LF.TimeBase
 * include LF.TimeSender
 *
 * func(sender,eventArgs)
 */
LF.Time=function(interval,eventArgs,func,times,timeBase)
{
	///field
	var This=this;
	//forever times is -1
	var _times=-1;
	var _eventArgs=eventArgs||null;
	var _timeBase=timeBase||(new LF.TimeBase());
	var _isAdd=false;
	var _onRemove=LF.defaultFunc;
	var _onRemoveArgs=_eventArgs;

	///function
	var inFunc=LF.defaultFunc;
	
	this.setInterval=function(interval)
	{
		if(interval && typeof(interval)=='number')
		{
			This.interval=interval;
			if(This.lastTime>interval)
			{
				This.lastTime=interval;
			}
		}
	};

	/** setTimeBase在start后连使用会出现一点问题，未解决。
	this.setTimeBase=function(timeBase)
	{
		if(!timeBase||timeBase===_timeBase)
		{
			return;
		}
		var isStop=This.isStop;
		This.remove();
		_timeBase=timeBase;
		if(!isStop)
		{
			This.start();
		}
	}
	*/

	this.getTimeBase=function()
	{
		return _timeBase;
	}

	this.setFunc=function(eventArgs,func)
	{
		if(func && typeof(func)=='function')
		{
			inFunc=func;
			_eventArgs=eventArgs||_eventArgs;
		}
	};

	this.setOnRemove=function(func,args)
	{
		_onRemove=func;
		_onRemoveArgs=args;
	}

	this.setTimes=function(times)
	{
		if(times&& typeof(times)=='number')
		{
			_times=times;
		}
	};
	this.getTimes=function()
	{
		return _times;
	}

	this.call=function()
	{
		if(_times==0)
		{
			This.remove();
			return;
		}
		else
		{
			_times--;
			inFunc(This,_eventArgs);
		}
	};
	this.start=function()
	{
		if(This.isStop)
		{
			This.isStop=false;
			_isAdd=true;
			This.lastTime=_timeBase.getInterval();
			_timeBase.add(This);
		}
	}
	this.stop=function()
	{
		This.isStop=true;
	}
	this.remove=function()
	{
		This.stop();
		if(_isAdd)
		{
			_timeBase.remove(This);
			_onRemove(This,_onRemoveArgs);
			_isAdd=false;
		}
	}
	this.setInterval(interval);
	this.setFunc(_eventArgs,func);
	this.setTimes(times);
}
LF.Time.prototype=LF.getInherit(LF.TimeSender);
// end class LF.Time
