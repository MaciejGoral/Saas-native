var express = require('express');
var router = express.Router();

var ListaPasiek=[
  {
    name:"BPasieka 1",
    date:"2019-01-03",
    number:"2019010100123424",
  },
  {
    name:"CPasieka o dlugiej nazwie 30 znakow",
    date:"2019-01-01",
    number:"2019010200123424",
  },
  {
    name:"APasieka !@#$%^^&*()_+",
    date:"2019-01-02",
    number:"2019010200323424",
  }
]

function CalculateChecksum(number)
{
  var sum = BigInt(number);
  for(var i = 0; i < number.length; i++)
  {
    if(parseInt(number[i])!=0)
    {
    sum *= BigInt(number[i]);
    }
  }
  sum=sum.toString();
  return sum[1]+sum[6]+sum[sum.length-1];
}

function getFirstFreeIdFromDate(date)
{
  var ids=[]
  for(var i=0;i<ListaPasiek.length;i++)
  {
    if(ListaPasiek[i].date==date)
    {
      ids.push(parseInt(ListaPasiek[i].number.substring(8,13)));
    }
  }
  free=1;
  ids.sort()
  while(i<100000)
  {
    if(!ids.includes(free))
    {
      return free.toString();
    }
    free++;
  }
  return 0;
}

function generateNumber(id,date)
{
  dateInt=date.split('-').join('')
  idInt=id.padStart(5, 0)
  return dateInt+idInt+CalculateChecksum(dateInt+idInt)
  
}
router.post('/', function(req, res, next) {
  var pasieka=req.body.state;
  var Id=pasieka.number;
  if(Id=='')
  {
    Id=getFirstFreeIdFromDate(pasieka.date);
    if(Id==0)
    {
      res.send({success:false,message:'Dzienny limit pasiek wyczerpany. Spróbuj ponownie jutro.'});
    }
    else
    {
      ListaPasiek.push({name:pasieka.name,date:pasieka.date,number:generateNumber(Id,pasieka.date)});
      res.send({success:true,message:"Pasieka dodana"});
    }
  }
  else if(ListaPasiek.filter(x => parseInt(x.number.substring(8,13)) === parseInt(Id)).length!=0)
  {
    res.send({success:false,message:"Pasieka o takim numerze juz istnieje. Wybierz inny numer."});
  }
  else
  {
    res.send({success:true,message:"Pasieka dodana"});
    ListaPasiek.push({name:pasieka.name,date:pasieka.date,number:generateNumber(Id,pasieka.date)});
  } 
});

router.get('/list', function(req, res, next) {
  res.send(ListaPasiek);
});

function getApiariesInDateRange(from,to)
{
  var filtered=ListaPasiek;
  if(from!=="")
  {
    filtered=filtered.filter(x => Date.parse(x.date)>=Date.parse(from));
  }
  if(to!=="")
  {
    filtered=filtered.filter(x => Date.parse(x.date)<=Date.parse(to));
  }
  return filtered;
}

router.post('/list', function(req, res, next) {
  console.log(req.body);
  res.send(getApiariesInDateRange(req.body.dateRange.from,req.body.dateRange.to))
});

module.exports = router;
