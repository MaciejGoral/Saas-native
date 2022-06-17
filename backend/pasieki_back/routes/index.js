var express = require('express');
var router = express.Router();

var listOfApiaries=[  //przykładowe dane, numery nie są prawidłowe
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

function getFirstFreeIdFromDate(date) //zwraca pierwsze wolne id w danym dniu lub 0 jesli nie ma
{
  var ids=[]
  for(var i=0;i<listOfApiaries.length;i++)
  {
    if(listOfApiaries[i].date==date)
    {
      ids.push(parseInt(listOfApiaries[i].number.substring(8,13)));
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
  var apiary=req.body.state;
  var id=apiary.number;
  if(id=='')
  {
    id=getFirstFreeIdFromDate(apiary.date);
    if(id==0)
    {
      res.send({success:false,message:'Dzienny limit pasiek wyczerpany. Spróbuj ponownie jutro.'});
    }
    else
    {
      listOfApiaries.push({name:apiary.name,date:apiary.date,number:generateNumber(id,apiary.date)});
      res.send({success:true,message:"Pasieka dodana"});
    }
  }
  else if(listOfApiaries.filter(x => parseInt(x.number.substring(8,13)) === parseInt(id) && x.date===apiary.date).length!=0) //zakladamy ze numery w danym dniu nie moga sie powtarzac
  {
    res.send({success:false,message:"Pasieka o takim numerze juz istnieje. Wybierz inny numer."});
  }
  else
  {
    res.send({success:true,message:"Pasieka dodana"});
    listOfApiaries.push({name:apiary.name,date:apiary.date,number:generateNumber(id,apiary.date)});
  } 
});

function getApiariesInDateRange(from,to)
{
  var filtered=listOfApiaries;
  if(from!=="")
  {
    filtered=filtered.filter(x => x.date>=from);
  }
  if(to!=="")
  {
    filtered=filtered.filter(x => x.date<=to);
  }
  return filtered;
}

router.post('/list', function(req, res, next) {
  res.send(getApiariesInDateRange(req.body.dateRange.from,req.body.dateRange.to))
});

module.exports = router;
