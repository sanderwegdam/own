<div class="row">
   <div class="col-lg-12">
   <div class="panel panel-default">
   <div class="panel-heading">
   <h2><?= $title; ?></h2>
   </div>
<?php foreach($voorraad as $vr) : ?>

			            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h2></h2>

                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                    			<th><label class="product-naam">Onderdeel</label></th>
                                <th><label class="product-naam">Beschrijving</label></th>
								<th><label class="product-naam">Aantal</label></th>
								<th><label class="product-naam">Leverancier(s)</label></th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>    
                                        <td><small><?php echo $vr['id']; ?></small></td>                   
                                            <td><small><?php echo $vr['onderdeel']; ?></small></td>
                                            <td><small><?php echo $vr['beschrijving']; ?></small></td>
                                            <td><small><?php echo $vr['aantal']; ?></small></td>
                                            <td><small><?php echo $vr['leverancier']; ?></small></td>
                                        </tr>                                   
                                    </tbody>
                                </table>    
                                <p><a class="btn btn-default" href="<?php echo site_url('/voorraad/' . $vr['slug']); ?>">Voorraad aanpassen</a></p>
                            </div>
                            <!-- /.table-responsive -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-6 -->                
            </div>	
		<?php endforeach; ?>