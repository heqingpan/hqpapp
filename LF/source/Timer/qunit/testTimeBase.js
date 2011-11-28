module("TimeBase");
var timeBase=new LF.TimeBase();
var timeBase2=new LF.TimeBase(30);
var sender1,sender2;
sender1={
	lastTime:timeBase.getInterval(),
	interval:20,
	call:function()
	{
		if(this.times==1)
		{
			sender2.interval=50;
		}
		var This=this;
		this.sum+=this.number;
		this.number+=this.step;
		this.times++;
		test("even step:"+This.times,function(){ok(This.sum<=(0+18)*10/2);});
		if(this.times>=10)
		{
			this.makeRemove=true;
			test("even <span style='color:#FF0000;'>end</span>",function(){equal(This.sum,(0+18)*10/2);});
		}
	},
	sum:0,
	step:2,
	number:0,
	times:0,
	makeRemove:false,
	isRemove:false
};
sender2={
	lastTime:timeBase.getInterval(),
	interval:20,
	call:function()
	{
		if(this.times==3)
		{
			sender1.interval=100;
		}
		if(this.times==7)
		{
			sender1.makeRemove=true;
		}
		var This=this;
		this.sum+=this.number;
		this.number+=this.step;
		this.times++;
		test("odd step:"+This.times,function(){ok(This.sum<=(1+19)*10/2);});
		if(this.times>=10)
		{
			this.makeRemove=true;
			test("odd <span style='color:#FF0000;'>end</span>",function(){equal(This.sum,(1+19)*10/2);});
		}
	},
	sum:0,
	step:2,
	number:1,
	times:0,
	makeRemove:false,
	isRemove:false
};
timeBase.add(sender1);
(new LF.TimeBase()).add(sender2);
//timeBase2.add(sender2);
