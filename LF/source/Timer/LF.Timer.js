/**
 * class LF.TimeSender
 *
 */
LF.TimeSender=function(func,interval)
{
	this.interval=interval||100;
	this.lastTime=this.interval;
	this.call=func||LF.defaultFunc;
	this.isPause=true;
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
	var _isStop=true;
	var _onStop=LF.defaultFunc;
	var _onStopArgs=_eventArgs;

	var inFunc=LF.defaultFunc;
	
	/** public begin **/

	this.setInterval=function(interval)
	{
		if(interval && typeof(interval)=='number')
		{
			This.interval=interval;
			This.lastTime=_timeBase.getInterval();
		}
	};

	/** setTimeBase在start后连使用会出现一点问题，未解决。*/
	this.setTimeBase=function(timeBase)
	{
		if(!timeBase||timeBase===_timeBase)
		{
			return;
		}
		var isPause=This.isPause;
		This.stop();
		_timeBase=timeBase;
		if(!isPause)
		{
			This.start();
		}
	}


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

	this.setOnStop=function(func,args)
	{
		_onStop=func;
		_onStopArgs=args||_onStopArgs;
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
			This.stop();
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
		if(_isStop)
		{
			This.isPause=false;
			_isStop=false;
			This.lastTime=_timeBase.getInterval();
			_timeBase.add(This);
		}
		else if(This.isPause)
		{
			This.isPause=false;
		}
	}
	this.pause=function()
	{
		This.isPause=true;
	}
	this.stop=function()
	{
		This.pause();
		if(!_isStop)
		{
			_timeBase.remove(This);
			_onStop(This,_onStopArgs);
			_isStop=true;
		}
	}
	/** public end **/


	this.setInterval(interval);
	this.setFunc(_eventArgs,func);
	this.setTimes(times);
}
LF.Time.prototype=LF.getInherit(LF.TimeSender);
// end class LF.Time
/** 更改 2011.12.28 09.21
 * 改变Timer.setInterval的初始时间，使其尽量马上执行
 */
