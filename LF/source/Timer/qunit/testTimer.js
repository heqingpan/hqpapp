module("Time");
var func1,func2;
var obj1,obj2;
var time1,time2,time3;

//eventArg:{name,sum,times,step,number}
func1=function(sender,eventArgs)
{
	eventArgs.number+=eventArgs.step;
	eventArgs.sum+=eventArgs.number;
	eventArgs.times++;
	if(eventArgs.times==2)
	{
		time2.setInterval(150);
	}
	test(eventArgs.name+" "+eventArgs.times+": sum="+eventArgs.sum
		,function()
	{
		ok(true);
	});
	if(eventArgs.times>9)
	{
		sender.stop();
	}
}

//eventArg:{name,sum,times,step,number}
func2=function(sender,eventArgs)
{
	obj2.number+=obj2.step;
	obj2.sum+=obj2.number;
	obj2.times++;
	if(obj2.times==4)
	{
		time1.setInterval(200);
		time1.setTimes(1);
		obj1.name=obj1.name+" <span style='color:#FF0000;'>over</span>";
	}
	test(obj2.name+" "+obj2.times+": sum="+obj2.sum
		,function()
	{
		ok(true);
	});
}

obj1={
	name:"obj1",
	sum:0,
	times:0,
	step:2,
	number:0
};

obj2={
	name:"obj2",
	sum:0,
	times:0,
	step:2,
	number:1
};

time1=new LF.Time(100,obj1,func1);
time2=new LF.Time(100,obj2,func2,10);

time3=new LF.Time(200,
	{name:"obj3",sum:0,times:0,step:2,number:0},
	function(timer,obj)		// timer is times,obj is {name:"obj3",...}
	{
		obj.number+=obj.step;
		obj.sum+=obj.number;
		obj.times++;
		if(obj.times==5)
		{
			timer.setInterval(50);
		}
		test(obj.name+" "+obj.times+": sum="+obj.sum
			,function()
		{
			ok(true);
		});
		if(obj.times>9)
		{
			timer.stop();
		}
	},
	10);

time1.start();
time2.start();
time3.start();
