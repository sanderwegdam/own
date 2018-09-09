(function($)
{
   var conf =
   {
   }
   ,

   numMSG = 20;
   containerDiv="juitterContainer",
   loadMSG="Loading messages...",
   imgName="loader.gif",
   readMore="Read it on Twitter",
   nameUser="image"
   live:"live-20",

   aURL="";
   msgNb=1;
   var mode, param, time, lang, contDiv, loadMSG, gifName, numMSG, readMore, fromID, ultID, filterWords;
   var running=false;

   apifMultipleUSER = "http://search.twitter.com/search.json?from%3A";
   apifUSER = "http://search.twitter.com/search.json?q=from%3A";
   apitMultipleUSER = "http://search.twitter.com/search.json?to%3A";
   apitUSER = "http://search.twitter.com/search.json?q=to%3A";
   apiSEARCH = "http://search.twitter.com/search.json?q=";
   $.Juitter =
   {
      registerVar: function(opt)
      {
         mode=opt.searchType;
         param=opt.searchObject;
         timer=opt.live;
         lang=opt.lang?opt.lang:"";
         contDiv=opt.placeHolder?opt.placeHolder:containerDiv;
         loadMSG=opt.loadMSG?opt.loadMSG:loadMSG;
         gifName=opt.imgName?opt.imgName:imgName;
         numMSG=opt.total?opt.total:numMSG;
         readMore=opt.readMore?opt.readMore:readMore;
         fromID=opt.nameUser?opt.nameUser:nameUser;
         filterWords=opt.filter;
         openLink=opt.openExternalLinks?"target='_blank'":"";
      }
      ,
      start: function(opt)
      {
         ultID=0;
         if($("#"+contDiv))
         {
            this.registerVar(opt);

            this.loading();

            aURL = this.createURL();

            this.conectaTwitter(1);

            if(timer!=undefined&&!running) this.temporizador();
         }
      }
      ,
      update: function()
      {
         this.conectaTwitter(2);
         if(timer!=undefined) this.temporizador();
      }
      ,
      loading: function()
      {
         if(loadMSG=="image/gif")
         {
            $("<img></img>")
            .attr('src', gifName)
            .appendTo("#"+contDiv);
         }
         else $("#"+contDiv).html(loadMSG);
      }
      ,
      createURL: function()
      {
         var url = "";
         jlg=lang.length>0?"&lang="+lang:jlg="";
         var seachMult = param.search(/,/);
         if(seachMult>0) param = "&ors="+param.replace(/,/g, "+");
         if(mode=="fromUser" && seachMult<=0) url=apifUSER+param;
         else if(mode=="fromUser" && seachMult>=0) url=apifMultipleUSER+param;
         else if(mode=="toUser" && seachMult<=0) url=apitUSER+param;
         else if(mode=="toUser" && seachMult>=0) url=apitMultipleUSER+param;
         else if(mode=="searchWord") url=apiSEARCH+param+jlg;
         url += "&rpp="+numMSG;
         return url;
      }
      ,
      delRegister: function()
      {

         if(msgNb>=numMSG)
         {
            $(".twittLI").each(
            function(o, elemLI)
            {
               if(o>=numMSG) $(this).hide("slow");
            }
            );
         }
      }
      ,
      conectaTwitter: function(e)
      {

         $.ajax(
         {
            url: aURL,
            type: 'GET',
            dataType: 'jsonp',
            timeout: 1000,
            error: function()
            {
               $("#"+contDiv).html("fail#");

            }
            ,
            success: function(json)
            {
               if(e==1) $("#"+contDiv).html("");
               $.each(json.results, function(i, item)
               {
                  if(e==1 || (i<numMSG && item.id>ultID))
                  {
                     if(i==0)
                     {
                        tultID = item.id;
                        $("<ul></ul>")
                        .attr('id', 'twittList'+ultID)
                        .attr('class', 'twittList')
                        .prependTo("#"+contDiv);
                     }
                     if (item.text != "undefined")
                     {
                        var link =  "http://twitter.com/"+item.from_user+"/status/"+item.id;

                        var tweet = $.Juitter.filter(item.text);

                        if(fromID=="image") mHTML="<a href='http://www.twitter.com/"+item.from_user+"'><img src='"+item.profile_image_url+"' alt='"+item.from_user+"' class='juitterAvatar' /></a> "+$.Juitter.textFormat(tweet)+" -| <span class='time'>"+item.created_at+"</span> |- <a href='" + link + "' class='JRM' "+openLink+">"+readMore+"</a>";
                        else mHTML="<a href='http://www.twitter.com/"+item.from_user+"'>@"+item.from_user+":</a> "+$.Juitter.textFormat(tweet)+" -| <span class='time'>"+item.created_at+"</span> |-  <a href='" + link + "' "+openLink+">"+readMore+"</a>";

                        $("<li></li>")
                        .html(mHTML)
                        .attr('id', 'twittLI'+msgNb)
                        .attr('class', 'twittLI')
                        .appendTo("#twittList"+ultID);

                        $('#twittLI'+msgNb).hide();
                        $('#twittLI'+msgNb).show("slow");

                        // remove old entries
                        $.Juitter.delRegister();
                        msgNb++;
                     }
                  }
               }
               );
               ultID=tultID;
            }
         }
         );
      }
      ,
      filter: function(s)
      {
         if(filterWords)
         {
            searchWords = filterWords.split(",");
            if(searchWords.length>0)
            {
               cleanHTML=s;
               $.each(searchWords, function(i, item)
               {
                  sW = item.split("->").length>0 ? item.split("->")[0] : item;
                  rW = item.split("->").length>0 ? item.split("->")[1] : "";
                  regExp=eval('/'+sW+'/gi');
                  cleanHTML = cleanHTML.replace(regExp, rW);
               }
               );
            }
            else cleanHTML = s;
            return cleanHTML;
         }
         else return s;
      }
      ,
      textFormat: function(texto)
      {

         var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
         texto = texto.replace(exp, "<a href='$1' class='extLink' "+openLink+">$1</a>");
         var exp = /[\@]+([A-Za-z0-9-_]+)/ig;
         texto = texto.replace(exp, "<a href='http://twitter.com/$1' class='profileLink'>@$1</a>");
         var exp = /[\#]+([A-Za-z0-9-_]+)/ig;
         texto = texto.replace(exp, "<a href='http://juitter.com/#$1' onclick='$.Juitter.start({searchType:\"searchWord\",searchObject:\"$1\"});return false;' class='hashLink'>#$1</a>");
         // make it bold
         if(mode=="searchWord")
         {
            tempParam = param.replace(/&ors=/,"");
            arrParam = tempParam.split("+");
            $.each(arrParam, function(i, item)
            {
               regExp=eval('/'+item+'/gi');
               newString = new String(' <b>'+item+'</b> ');
               texto = texto.replace(regExp, newString);
            }
            );
         }
         return texto;
      }
      ,
      temporizador: function()
      {

         running=true;
         aTim = timer.split("-");
         if(aTim[0]=="live" && aTim[1].length>0)
         {
            tempo = aTim[1]*1000;
            setTimeout("$.Juitter.update()", tempo);
         }
      }
   }
   ;
}

//  ---------------------------------------

)(jQuery);
