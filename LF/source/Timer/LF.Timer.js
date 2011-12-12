/**
 * class LF.TimeSender
 *
 */
LF.TimeSender=function(func,interval)
{
	this.interval=interval||100;
	this.lastTime=this.interval;
	this.call=func||function(){};
	this.isStop=true;
	this.tiggerNode=null;
}
//Inherit
LF.TimeSender.InheritValue=new LF.TimeSender();
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

	///function
	var inFunc=function(){};
	
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

	this.setTimeBase=function(timeBase)
	{
		var isStop=This.isStop;
		This.remove();
		_timeBase=timeBase;
		if(!isStop)
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
			_isAdd=false;
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
			_isAdd=false;
		}
	}
	this.setInterval(interval);
	this.setFunc(_eventArgs,func);
	this.setTimes(times);
}
LF.Time.prototype=LF.TimeSender.InheritValue;
// end class LF.Time
