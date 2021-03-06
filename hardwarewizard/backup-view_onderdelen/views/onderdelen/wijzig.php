<h2><?= $title; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('onderdelen/update'); ?>

  <input type="hidden" name="id" value="<?php echo $product['id']; ?>">
  <div class="form-group">
  <label>Onderdeel</label>
  <select name="onderdeel" class="form-control">
    <?php foreach($voorraad as $vr): ?>
      <option value="<?php echo '<h5>' . $vr['onderdeel'] . '</h5>' . ' ' .  $vr['beschrijving'] . '<h6>' . $vr['aantal'] . '</h6>' ; ?>"><?php echo '<h5>' . $vr['onderdeel'] . '</h5>' . ' ' .  $vr['beschrijving'] . ' ' . $vr['aantal'] ; ?></option>
    <?php endforeach; ?>
  </select>
  </div>

  <div class="form-group">
  <label>Leverancier</label>
  <select name="leverancier" class="form-control">
    <?php foreach($voorraad as $vr): ?>
      <option value="<?php echo $vr['leverancier']; ?>"><?php echo $vr['leverancier']; ?></option>
    <?php endforeach; ?>
  </select>
  </div>

  <button type="submit" class="btn btn-default">Submit</button>
</form>