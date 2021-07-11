


<h2><?= $title ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('voorraad/maak'); ?>
  <div class="form-group">
    <label>Onderdeel</label>
    <input class="form-control" name="onderdeel" placeholder="onderdeel">
 </div>
  <div class="form-group">
    <label>Beschrijving</label>
    <input type="text" class="form-control" name="beschrijving" 
    placeholder="beschrijving">
  </div>
  <div class="form-group">
    <label>Aantal</label>
    <input class="form-control" name="aantal" placeholder="aantal">
 </div>
  <div class="form-group">
    <label>Leverancier(s)</label>
    <input class="form-control" name="leverancier" 
    placeholder="leverancier(s)">
 </div>

  <button type="submit" class="btn btn-default">Submit</button>
</form>