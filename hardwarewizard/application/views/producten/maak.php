<h2><?= $title ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('producten/maak'); ?>


    <div class="form-group">
    <label>Product</label>
    <input type="text" class="form-control" name="title" placeholder="Product">
  </div>

  <div class="form-group">
    <label>Productnaam</label>
    <input type="text" class="form-control" name="name" placeholder="Productnaam">
  </div>

   <div class="form-group">
    <label>Prijs</label>
    <input type="text" class="form-control" name="prijs" placeholder="Prijs">
  </div> 

  
    <div class="form-group">
  <label>Voorraadlijst item</label>
  <select name="voorraad_id" class="form-control">
    <?php foreach($voorraad as $vr): ?>
      <option value="<?php echo $vr['id']; ?>"><?php echo $vr['onderdeel']; ?></option>
    <?php endforeach; ?>
  </select>
 </div>


  <button type="submit" name="Submit-maak" value="submit-maak" class="btn btn-default">Submit</button>
</form>