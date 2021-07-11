<?php 
	class Voorraadlijst_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
			public function get_voorraadlijst() {
			$this->db->order_by('name');
			$query = $this->db->get('voorraad');
			return $query->result_array();		
		}

			public function maak_voorraadlijst(){
			$slug = url_title($this->input->post('title'));
			$data = array(
			'name' => $this->input->post('name'),
			'slug' => $slug);
			return $this->db->insert('voorraad', $data);
		}

		public function update_voorraadlijst() {

				$slug = url_title($this->input->post('title'));
				$data = array (
				'title' => $this->input->post('title'),
				'name' => $this->input->post('name'),
			   	'product' => $this->input->post('product'),
			   	'slug' => $slug,
				'leverancier' => $this->input->post('leverancier'),
				'onderdeel' => $this->input->post('onderdeel'));
				
				$this->db->where('id', $this->input->post('id'));
				return $this->db->update('voorraad', $data);
		}

			public function selecteer_voorraadlijst($id){
			$query = $this->db->get_where('voorraad', array('id' => $id));
			return $query->row();
	}
}