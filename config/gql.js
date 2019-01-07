const serverbyprops = `
  query serverbyprops($name: String) {
    serverbyprops: server_by_props(name: $name) {
      id
      name
      description
      img
      createdAt
      updatedAt
    }
  }
`;

const servicebyprops = `
  query servicebyprops($server_id: ID) {
    servicebyprops: service_by_props(server_id: $server_id) {
      id
      server_id {
        id
        name
        description
        img
        createdAt
        updatedAt
      }
      repertory_id {
        id
        count
        createdAt
        updatedAt
      }
      description
      price
      startTime
      lastTime
    }
  }
`;

const createorderAndupdaterepertory = `
  mutation createorderAndupdaterepertory ($order_id: ID!, $contactTelephone: String, $contactName: String, $payStatus: String, $remark: String, $payCount: String, $payTime: String, $createdAt: String, $orderStatus: String, $user_id: ID, $service_id: ID, $customerNumber: Int, $repertory_id: ID, $updatedAt: String, $count: Int) {
    updaterepertory: update_repertory(id: $repertory_id count: $count updatedAt: $updatedAt) {
      id
      count
      updatedAt
    }

    createorder: create_order(id: $order_id contactTelephone: $contactTelephone contactName: $contactName payStatus: $payStatus remark: $remark payCount: $payCount createdAt: $createdAt updatedAt: $updatedAt payTime: $payTime createdAt: $createdAt orderStatus: $orderStatus user_id: $user_id service_id: $service_id customerNumber: $customerNumber) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        updatedAt
        orderStatus
        id
        customerNumber
        contactTelephone
        contactName
      }  
    }
`;

const userbyid = `
  query userbyid($id: ID) {
    userbyid: user_by_id(id: $id) {
      id
      openid
      admin
      username
      nickname
      password
      telephone
      email
      createdAt
      updatedAt
    }
  }
`;

const orderbyprops = `
    query orderbyprops($orderStatus: String, $user_id: ID) {
      orderbyprops: order_by_props(orderStatus: $orderStatus user_id: $user_id) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        contactTelephone
        contactName
        user_id {
          id
          openid
          admin
          username
          nickname
          password
          telephone
          email
          createdAt
          updatedAt
        }
        service_id {
          id
          description
          price
          startTime
          lastTime
          createdAt
          updatedAt
          repertory_id {
              id
              count
              createdAt
              updatedAt
            }
          server_id {
              id
              name
              description
              img
              createdAt
              updatedAt
           }
        }
        customerNumber
      }
    }
`;

const adminorderbyprops = `
    query adminorderbyprops($orderStatus: String) {
      adminorderbyprops: order_by_props(orderStatus: $orderStatus) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        contactTelephone
        contactName
        user_id {
          id
          openid
          admin
          username
          nickname
          password
          telephone
          email
          createdAt
          updatedAt
        }
        service_id {
          id
          description
          price
          startTime
          lastTime
          createdAt
          updatedAt
          repertory_id {
              id
              count
              createdAt
              updatedAt
            }
          server_id {
              id
              name
              description
              img
              createdAt
              updatedAt
           }
        }
        customerNumber
      }
    }
`;


module.exports = {
    serverbyprops: serverbyprops,
    servicebyprops: servicebyprops,
    createorderAndupdaterepertory: createorderAndupdaterepertory,
    userbyid: userbyid,
    orderbyprops: orderbyprops,
    adminorderbyprops: adminorderbyprops
};
