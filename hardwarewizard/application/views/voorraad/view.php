			            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                        <h3>Voorraad item<h3><h4><?= $title ?></h4>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">                        
                <a class="btn btn-default pull-left" href="<?php echo base_url(); ?>voorraad/wijzig/<?php echo $voorraad['slug']; ?>">Pas aan</a>
                <?php echo form_open('/voorraad/verwijder/' . $voorraad['id']); ?>
                <input type="submit" value="Verwijder" class="btn btn-danger">    
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->                
            </div>







