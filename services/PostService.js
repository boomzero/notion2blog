const FileUtil = require('../utils/file');
const Post = require('../models/Post');

module.exports = class PostService {
  static async getAllPosts() {
//     const posts = [{
//       "title": "How to learn k8s.",
//       "content": `
//   # u/hardwaresofton
// I've written about this before but can't be bothered to try and find it in my history or on HN or wherever. Basically I did this:

// - Read the kubernetes documentation from front to back (this was easier/shorter a long timer ago). Even if your eyes glaze over, you should be able to answer questions like "what thing do I need if I want to run something on every node in the cluster?" or "what's the difference between an ingress and a service?". At this point it's all theoretical so it's easy to get a breadth-first understanding
// - Do \`kubernetes the hard way\` (haven't done this in a while), but don't do it on GCP -- ignore all the GCP stuff, and when it comes up, you must understand what it's supposed to be doing, and apply the concepts/goal to your own infra (sometimes, there is no analog for what the guide does, and you should know when/why), and set up a single-node cluster on some rented KVM VPS (digital ocean droplet/ec2 instance/whatever). Avoid dipping into the CSI/dynamic storage provisioning rabbit hole, use hostPaths and/or localVolumes at first.
// - Get ingress working on that cluster (nginx-ingress is a good first-ingress -- know the difference between the one maintained by the kubernetes team and the one maintained by NGINX). Put up an nginx or whoami container, point DNS at your VPS, and get the page to load. For bonus points, exec into the nginx-ingress pod and take a look at /etc/nginx before and after the Pod+Service+Ingress are created.
// - Tear it all down
// - Get to the same place you were at, but with kubeadm
// - Get TLS support for your app automatically negotiated/requested by your cluster. There are lots of ways to do this, but you need to be able to look at 2-3 solutions, think about what you have installed, and evaluate what the best feature set and easiest-to-install/manage option is for you. The right answer here as far as I'm concerned is actually cert-manager, but it can be very complex/hard to understand, and has a bunch of moving parts -- you might want to find something simpler at first (hint: that integrates with nginx-ingress).
// - Run nmap against your single-node k8s cluster -- assuming you have no external dependencies, this is your attack surface. Maybe re-read the section on control plane to node communication. Node<->Node communication is not secure over the wide internet, so unless you're in a VPC (and even then you should theoretically secure the comms), you're at risk. Luckily, it's a single node cluster right now.
// - Tear it all down. By this point, you should be thinking about how you can set up your code such that bringing up a node from nothing (with everything you've struggled to figure out how to install being re-installed) is a one-command experience. There are lots of ways you can do this -- bash scripts, Makefiles, pulumi, terraform, python, javascript, ansible etc -- find one that works for you. Figure out a way you can store your secrets right in your infrastructure repo (hint: you should make an infrastructure repo for this), check out git-crypt or sops or some other entries in that space -- IMO skip vault/KMSes, they're too complex to understand easily, just use a symmetric or GPG key that you keep safe the usual ways.
// - Set it all up again with kubeadm (this should be a single command, whose input is the IP/DNS name of a new VPS/instance)
// - Start looking into dynamically provisioned storage. In order of complexity -- Longhorn > OpenEBS > Rook. Obviously if you're on a cloud provider, check out your local cloud providers' options for storage.
// - Deploy workloads like minio, redis, postgres
// - Use cert-manager -- there is value in decoupling your certificates from ingress
// - Install node_exporter , prometheus, and the kubernetes dashboard
// - ??? (there's more but I'm tired of typing now)
// - Tear it all down
// - Install it all again with k3s or k0s, and wonder at how easy everything is.
// - Compare networking (CNI) and storage (CSI) solutions
// - Check out workload isolation options like kata-containers and kubevirt, maybe use em, maybe don't.

// Also a general note -- never install anything with Helm -- at the beginning, always pull apart every chart/curl ... | kubectl apply - command you see, and (automate) apply -fing every file. It will make understanding the pieces that can go wrong, how they act together, and how addons usually are structured very easy. If you try to install something, and it's got 30 different parts, it may be too complex for you to grok right now, and that is a signal.

// Also, use containerd -- there are only two choices, containerd and cri-o (docker is containerd underneath), and IMO containerd is the better of the two.

// Kubernetes is ever moving and expanding target, so what you want to aim for is comfort, not mastery. When something goes wrong (it will), you want to be able to calmly and comfortably think through the resources and machinery that has "gummed up". If you hit the website you just tried to set up, and you get a 404, you should be able to ask yourself (and the mental model of the system you have in your mind) about what that means/why you're getting a 404 (ex. is the ingress controller the problem? is it the service? is it the pod itself? how about kube-proxy? do you have any NetworkPolicys that might interfere? Is the firewall on the node that got contacted open?)

// [EDIT] Thought it might be good to add -- the operator pattern (CRDs + Controllers) is the most important part of kubernetes -- it is the crux of kubernetes itself. Everything that is good about kubernetes springs from this pattern (including the CNI and CSI, they are basically efforts to standardize a specific implementation/API of an operator pattern). If people knew this earlier (hindsight is 20/20), Kubernetes could have been much simpler, but if you're getting fatigued with the operator pattern and don't understand why it's popping up everywhere, thinking of kubernetes as just a collection of operators where some of them are maintained by the project ("in tree") and some are maintained by others ("out of tree") is an interesting thought experiment I think.
//   `
//     }]

    const posts = await Post.find();
    posts.forEach(post => post['content'] = FileUtil.convertMarkdownToHTML(post['content']))

    return posts;
  }

  static async createPost(title, authorName, authorEmail, privacy, content, cb) {
    Post.create({ title: title, content: content, author_name: authorName, author_email: authorEmail, privacy: privacy }, (err, res) => {
      if (err) {
        return cb(err);
      }
      return cb(null, res);
    })
  }
}