<style type="text/css">
<!--
.style1 {font-family: Arial, Helvetica, sans-serif}
.style2 {font-size: 14px}
-->
</style>
<div id="contact">
<table width="100%" class="regel" border="0">
<tr>
<td>
<table width="100%" border="0" cellspacing="0" cellpadding="2">


<tr> 
<td>&nbsp;</td>
<td valign="top" colspan="2"> 


<?php
if(isset($_POST['Submit'])){

//HTML- en PHP-Tags uit de invoervelden verwijderen
$naam=strip_tags($_POST['naam']);
$email=strip_tags($_POST['email']);
$vraag=strip_tags($_POST['vraag']);

if(strlen($naam)<3){
$error_msg="Typ uw naam.<br>";
}
if(!ereg("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,4})$",$email)){
$error_msg.="Geef een geldig e-mailadres op.<br>";
}
if(strlen($vraag)<3){
$error_msg.="Stel de vraag.<br>";
}
if(isset($error_msg)){
//Een van de velden is niet juist ingevuld
echo "Helaas kan uw aanvraag om de volgende reden niet worden verwerkt:<br><br>";
echo $error_msg;
echo "<br>Klik op <a href=javascript:history.back(1)>vorige</a> en vul alle velden in.";
}else{
//Alle velden ingevuld - eMail genereren - vul als testuw eigen e-mailadres in achter $recipient
$recipient="sanderwegdam@gmail.com";
$subject="Een aanvraag vanaf Internet";
$header="From: " . $email . "\r\n";
$mail_body ="Het aanvraagformulier is op " . date("d-m-Y") . " om " . date("H:i") . "uur verzonden.\n";
$mail_body.="Het bevat de volgende inhoud:\n\n";
$mail_body.="Naam: " . $naam . "\n";
$mail_body.="eMail: " . $email . "\n\n";
$mail_body.="Vraag:\n";
$mail_body.=$vraag . "\n\n ---- Einde van de automatisch gegenereerde eMail ----";

mail($recipient,$subject,$mail_body,$header);
//Formulier verzonden - melden
echo "Bedankt voor uw vraag.";
}
}else{
//Formulier nog niet verzonden - Formulier weergeven
?>

<h3><span class="style2">Gebruik dit formulier om contact met ons op te nemen</span><br>
</h3>
<form action="<?php $_SERVER['PHP_SELF'] ?>" method="POST"> 
<table width="500" border="0" cellspacing="2" cellpadding="2" class="regel">
<tr> 
<td width="183" >Typ hier uw naam:</td>
<td width="232">
<input type="text" name="naam" size="35"></td>
</tr>
<tr> 
<td width="183" >Typ hier uw e-mailadres:</td>
<td width="232">
<input type="text" name="email" size="35"></td>
</tr>
<tr> 
<td width="183" >Uw vraag:</td>
<td width="232">
<textarea name="vraag" cols="30" rows="3"></textarea></td>
</tr>
<tr> 
<td colspan="2"> 
<div align="center">
<input type="submit" name="Submit" value="Verzenden">
</div></td>
</tr>
</table>
</form>


<?php
}
?></td>
<td>&nbsp;</td>
</tr>
</table></td>
</tr>
</table>
</div>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-7833481-1");
pageTracker._trackPageview();
} catch(err) {}</script>
<div id="webdesign"><p class="style9"></div>
