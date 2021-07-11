<h2><?= $title; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('voorraad/update'); ?>

  <input type="hidden" name="id" value="<?php echo $voorraad['id']; ?>">
 
<div class="form-group">
    <label>Onderdeel</label>
     <input type="text" class="form-control" name="onderdeel" placeholder="onderdeel"
     value="<?php echo $voorraad['onderdeel']; ?>">
  </div>
  <div class="form-group">
    <label>Beschrijving</label>
     <input type="text" class="form-control" name="beschrijving" placeholder="beschrijving" 
     value="<?php echo $voorraad['beschrijving']; ?>">
  </div>
  <div class="form-group">
    <label>Aantal</label>
     <input type="text" class="form-control" name="aantal" placeholder="aantal"
     value="<?php echo $voorraad['aantal']; ?>">
  </div>
<div class="form-group">
    <label>Leverancier(s)</label>
     <input type="text" class="form-control" name="leverancier" placeholder="leverancier(s)" 
     value="<?php echo $voorraad['leverancier']; ?>">
  </div>

  <button type="submit" class="btn btn-default">Submit</button>
</form>