//// class LF.TimeSender
LF.TimeSender=function(func,interval)
{
	this.interval=interval||100;
	this.lastTime=this.interval;
	this.call=func||function(){};
	this.makeRemove=false;
	this.isRemove=true;
}
////MakeParent
LF.TimeSender.MakeParent=new LF.TimeSender();
//// end class LF.TimeSender


//// class LF.Time
//include LF.TimeBase
//include LF.TimeSender
//
//func(sender,eventArgs)
LF.Time=function(interval,eventArgs,func,times,baseInterval)
{
	///field
	var This=this;
	//forever times is -1
	var _times=-1;
	var _eventArgs=eventArgs||null;
	var _timeBase=new LF.TimeBase(parseInt(baseInterval));

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
		if(This.isRemove)
		{
			This.isRemove=false;
			This.makeRemove=false;
			This.lastTime=_timeBase.getInterval();
			_timeBase.add(This);
		}
		else
		{
			This.makeRemove=false;
		}
	}
	this.stop=function()
	{
		This.makeRemove=true;
	}
	this.setInterval(interval);
	this.setFunc(_eventArgs,func);
	this.setTimes(times);
}
LF.Time.prototype=LF.TimeSender.MakeParent;
//// end class LF.Time
