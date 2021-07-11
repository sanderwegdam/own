<?php 
	class Producten extends CI_Controller{
		public function index() {

		   	$data['title'] = 'Laatste producten HardwareWizard';
			$data['toevoegen'] = 'Voeg hieronder je producten toe';   
			$data['description'] = 'Hieronder zie je de toegevoegde producten';
			$data['producten'] = $this->product_model->get_producten();
			$data['voorraad'] = $this->product_model->get_voorraad();

            $this->load->view('stylesheets/producten');
			$this->load->view('templates/header');
			$this->load->view('producten/index', $data);
			$this->load->view('templates/footer');
		}

		
		public function view($slug = NULL){
			$data['product'] = $this->product_model->get_producten($slug);

			if(empty($data['product'])){
				show_404();
			}

			$data['title'] = $data['product']['title'];

            $this->load->view('templates/producten');
			$this->load->view('templates/header');
			$this->load->view('producten/view', $data);
			$this->load->view('templates/footer');

		}

		public function maak() {
			$data['title'] = 'Maak Product';

			$data['voorraad'] = $this->product_model->get_voorraad();
			
			$this->form_validation->set_rules('title', 'Product', 'required');
			$this->form_validation->set_rules('name', 'Productnaam', 'required');
			$this->form_validation->set_rules('prijs', 'Prijs', 'required');
			

			if($this->form_validation->run() === FALSE){
                $this->load->view('stylesheets/front');
				$this->load->view('templates/header');
				$this->load->view('producten/maak', $data);
				$this->load->view('templates/footer');				
			} else {
				$this->product_model->maak_product();
				redirect('producten');
			}
		}

			public function toevoegen() {

			$data['title'] = 'Voeg onderdeel toe';

			$data['voorraad'] = $this->product_model->get_onderdeel();

			$data['producten'] = $this->product_model->get_producten();
			
			$this->form_validation->set_rules('title', 'Title', 'required');
			$this->form_validation->set_rules('onderdeel', 'Onderdeel', 'required');
						

			if($this->form_validation->run() === FALSE){
                $this->load->view('stylesheets/toevoegen');
				$this->load->view('templates/header');
				$this->load->view('producten/toevoegen', $data);
				$this->load->view('templates/footer');
			} else {
				$this->product_model->toevoegen_product();
				redirect('producten');
			}
		}


		public function verwijder($id) {
			$this->product_model->delete_product($id);
			redirect('producten');
		}


			public function wijzig($slug){

			$data['product'] = $this->product_model->get_producten($slug);
			$data['voorraad'] = $this->product_model->get_voorraad();

			if(empty($data['product'])){
				show_404();
			}

			$data['title'] = 'Wijzig product';
			$this->load->view('templates/style');
			$this->load->view('templates/header');
			$this->load->view('producten/wijzig', $data);
			$this->load->view('templates/footer');


			}


			public function aanpassen($slug){

			$data['producten'] = $this->product_model->get_onderdeel();
			$data['product'] = $this->product_model->get_producten($slug);
			$data['voorraad'] = $this->product_model->get_voorraad();

			if(empty($data['product'])){
				show_404();
			}

			$data['title'] = 'Pas onderdeel aan';
			$this->load->view('templates/style');
			$this->load->view('templates/header');
			$this->load->view('producten/aanpassen', $data);
			$this->load->view('templates/footer');
			}

			public function update() {
				$this->product_model->update_product();
				redirect('producten');
			}

			public function posts($id){

			$data['title'] = $this->product_model->	
			selecteer_voorraad($id)->name; //only name
			$data['producten'] = $this->product_model->selecteer_producten_van_voorraad($id);
			$this->load->view('templates/style');
			$this->load->view('templates/header');
			$this->load->view('producten/index', $data);
			$this->load->view('templates/footer');
		}		

	}
