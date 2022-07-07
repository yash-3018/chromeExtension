$(function(){

    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total','limit'],function(budget){
            
            var newTotal=0;
            if(budget.total){
                newTotal+=parseFloat(budget.total);
            }

            var amount=$('#amount').val();
            
            if(amount){
                newTotal+=parseInt(amount);
            }
            // chrome.tts.speak("you have added "+amount+" dollars in your budget manager",{'rate':2});

            chrome.storage.sync.set({'total':newTotal},function(){
                if(amount&&newTotal>=budget.limit){
                    var notifOptions={
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached!',
                        message: "Uh oh! Looks like you've reached your limit!"
                    };
                    chrome.tts.speak("Oops! You have reached your limit!",{'rate':1.4});
                    chrome.notifications.create('limitNotif',notifOptions);
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        })
    })

    $('#currency').change(function(){

       chrome.storage.sync.get(['total','limit','curr'],function(budget){
           
          var val;
          var limit;
          var curr="Dollar";
          if($('#currency').val()){
            curr=$('#currency').val();
          }

          var pre="Dollar";
          if(budget.curr){
            pre=budget.curr;
          }

          chrome.storage.sync.set({'curr':curr},function(){});
          console.log(curr);

          if(pre!=curr){
            if(pre=='Dollar'&&curr=='Rupee'){
               val=budget.total*79;
               limit=budget.limit*79;
            }
            if(pre=='Dollar'&&curr=='Euro'){
                val=budget.total*0.98;
                limit=budget.limit*0.98;
            }
            if(pre=='Rupee'&&curr=='Dollar'){
                val=budget.total/79;
                limit=budget.limit/79;
             }
             if(pre=='Rupee'&&curr=='Euro'){
                 val=budget.total/80.82;
                 limit=budget.limit/80.82;
             }
             if(pre=='Euro'&&curr=='Rupee'){
                val=budget.total*80.82;
                limit=budget.limit*80.82;
             }
             if(pre=='Euro'&&curr=='Dollar'){
                 val=budget.total/0.98;
                 limit=budget.limit/0.98;
             }
             val=Math.round(val);
             limit=Math.round(limit);

             $('#total').text(val);
             $('#limit').text(limit);
             chrome.storage.sync.set({'total':val},function(){});
             chrome.storage.sync.set({'limit':limit},function(){});
             
          }

       })

    })





})